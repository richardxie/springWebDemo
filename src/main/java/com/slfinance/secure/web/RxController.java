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

package com.slfinance.secure.web;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import rx.Observable;
import rx.Subscriber;
import rx.schedulers.Schedulers;

import com.slfinance.secure.domain.Customer;

/**
 * RXjava测试控制器
 * 
 * @author kongxiong
 *
 */
@Controller
public class RxController {
	
	@Secured("ROLE_USER")
	@RequestMapping("/rxjava")
	@ResponseBody
	public String rxCreate() {
		List<Customer> c = Arrays.asList(new Customer("1", "Joe", 21), new Customer("2", "Jim", 22), new Customer("3", "John", 23));
		c.forEach((p) -> { System.out.println(p);} );
		List<String> l = c.stream().filter((p) ->{ return p.getAge() > 21;}).map(p->{ return p.getName();}).collect(Collectors.toList());
		System.out.println(l.size());
		
		Observable.from(c).subscribe( (item) -> {System.out.println("Next: " + item);});
		testRxJavaCreate();
		testRxJavaCreate2();
		testRxJavaCreate3();
		testRxJavaCreate4();
		testRxJavaCreate5();
		return "rxCreate";
	}
	
	@Secured("ROLE_USER")
	@RequestMapping("/rxjs")
	public String rxjs() {
		return "rxjs/rxjs";
	}
	
	private void testRxJavaCreate() {
		Observable.create(new Observable.OnSubscribe<Integer>() {
		    @Override
		    public void call(Subscriber<? super Integer> observer) {
		        try {
		            if (!observer.isUnsubscribed()) {
		                for (int i = 1; i < 5; i++) {
		                    observer.onNext(i);
		                }
		                observer.onCompleted();
		            }
		        } catch (Exception e) {
		            observer.onError(e);
		        }
		    }
		 } ).subscribe(new Subscriber<Integer>() {
		        @Override
		        public void onNext(Integer item) {
		            System.out.println("Next: " + item);
		        }

		        @Override
		        public void onError(Throwable error) {
		            System.err.println("Error: " + error.getMessage());
		        }

		        @Override
		        public void onCompleted() {
		            System.out.println("Sequence complete.");
		        }
		    });
	}
	
	private void testRxJavaCreate2() {
		Observable.create((observer) -> {
			 try {
		         if (!observer.isUnsubscribed()) {
		        	 for (int i = 1; i < 5; i++) {
		        		 observer.onNext(i);
		        	 }
		        	 observer.onCompleted();
		         }
		        } catch (Exception e) {
		            observer.onError(e);
		        }
			}).subscribe(
				 (item) -> {System.out.println("Next: " + item);},
				 (Throwable t) -> { System.err.println("Error: " + t.getMessage());},
				 ()->{ System.out.println("Sequence complete.");}
		 );
	}
	
	private void testRxJavaCreate3() {
		Observable.create((observer) -> {
			 try {
		         if (!observer.isUnsubscribed()) {
		        	 RestTemplate rest = new RestTemplate();
		        	 List<Customer> obj = rest.getForObject("http://localhost:8050/cust", List.class);
		        	 observer.onNext(obj);
		        	 observer.onCompleted();
		         }
		        } catch (Exception e) {
		            observer.onError(e);
		        }
			}).subscribe(
				 (item) -> {
					 System.out.println("Next: " + item);
					},
				 (Throwable t) -> { System.err.println("Error: " + t.getMessage());},
				 ()->{ System.out.println("Sequence complete.");}
		 );
	}
	
	private void testRxJavaCreate4() {
		o().flatMap((cs) -> Observable.from(cs)).filter(c -> c.getAge() > 25).map(age -> age.getAge() + 10).reduce((sum,age) -> sum = sum + age)
		.subscribe(
				 (item) -> {System.out.println("Next: " + item);},
				 (Throwable t) -> { System.err.println("Error: " + t.getMessage());},
				 ()->{ System.out.println("Sequence complete.");}
		 );
	}
	
	private void testRxJavaCreate5() {
		o().subscribeOn(Schedulers.io()).flatMap((cs) -> Observable.from(cs)).filter(c -> c.getAge() > 25).map(age -> age.getAge() + 10).reduce((sum,age) -> sum = sum + age)
		.subscribe(
				 (item) -> {
					 System.out.println("Next: " + item);
					},
				 (Throwable t) -> { System.err.println("Error: " + t.getMessage());},
				 ()->{ System.out.println("Sequence complete.");}
		 );
	}
	
	private Observable<List<Customer>> o() {
		return Observable.create((observer) -> {
			try {
				if (!observer.isUnsubscribed()) {
					RestTemplate rest = new RestTemplate();
					RequestEntity<List<Customer>> requestEntity = new RequestEntity<>(HttpMethod.GET, URI.create("http://localhost:8050/cust"));
					List<Customer> obj = rest.exchange(requestEntity, new ParameterizedTypeReference<List<Customer>>() {}).getBody();
					observer.onNext(obj);
					observer.onCompleted();
				}
			} catch (Exception e) {
				observer.onError(e);
			}
		});
	}
}
