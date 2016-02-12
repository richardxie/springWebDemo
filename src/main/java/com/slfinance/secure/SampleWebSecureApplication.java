/*
 * Copyright 2012-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.slfinance.secure;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.dialect.IDialect;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ITemplateResolver;

import com.google.common.collect.Sets;

@EnableAutoConfiguration
@ComponentScan
@Controller
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SampleWebSecureApplication extends WebMvcConfigurerAdapter {

	public static void main(String[] args) throws Exception {
		new SpringApplicationBuilder(SampleWebSecureApplication.class).run(args);
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/login").setViewName("login");
	}
	
	@Autowired
	private final Collection<ITemplateResolver> templateResolvers = Collections
			.emptySet();

	@Autowired(required = false)
	private final Collection<IDialect> dialects = Collections.emptySet();

	@Bean
	public SpringTemplateEngine templateEngine() {
		SpringTemplateEngine engine = new SpringTemplateEngine();
		for (ITemplateResolver templateResolver : this.templateResolvers) {
			engine.addTemplateResolver(templateResolver);
		}
	
		for (IDialect dialect : this.dialects) {
			engine.addDialect(dialect);
		}
		Set<IDialect> s = Sets.newHashSet();
		s.add(new org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect());
		engine.setAdditionalDialects(s);
		return engine;
	}
	
	@Bean
	public RequestMatcher csrfSecurityRequestMatcher() {
		RequestMatcher matcher = new RequestMatcher() {

			 private Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");

			@Override
			public boolean matches(HttpServletRequest request) {
				String servletPath = request.getServletPath();
				if(servletPath.contains("/logout"))
					return false;
				return !allowedMethods.matcher(request.getMethod()).matches();
			}
		};
		
		return matcher;
	}
	@Bean
	public ApplicationSecurity applicationSecurity() {
		return new ApplicationSecurity();
	}
	

	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class ApplicationSecurity extends WebSecurityConfigurerAdapter {

		@Autowired
		private SecurityProperties security;
		
		public void configure(WebSecurity web) throws Exception {
			  web.ignoring().antMatchers("/static/**", "/**/*.html", "/**/*.css", "/**/*.js");  
		}


		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.authorizeRequests().antMatchers("/", "/register", "/cust/isExist").permitAll()
				.anyRequest().authenticated()
				.and().formLogin().loginPage("/login").failureUrl("/login?error").permitAll()
				.and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/home")
				.and().exceptionHandling().accessDeniedPage("/access?error")
				.and().csrf()
				.and().rememberMe().key("demokey").tokenValiditySeconds(1209600);
		}

		@Override
		public void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.eraseCredentials(false).inMemoryAuthentication().withUser("admin").password("admin")
					.roles("ADMIN", "SUPERVISOR", "USER").and().withUser("user").password("user")
					.roles("USER");
		}
	}
}
