package com.slfinance.secure.domain;

import java.util.List;
import java.util.Map;


public interface CustomerRepositoryCust {
	 List<Map<String, Object>> searchCust(String pattern);
}
