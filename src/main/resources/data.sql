/* STATE */
INSERT INTO customer_state (id, description) VALUES (1, 'normal');
INSERT INTO customer_state (id, description) VALUES (2, 'frozed');
INSERT INTO customer_state (id, description) VALUES (3, 'deleted');
/* CUSTOMERS */
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f1', 'marissa', 'marissa@g.cn', 1, 28);
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f2', 'john', 'john@g.cn', 1, 23);
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f3', 'alex', 'alex@g.cn', 2, 18);
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f4', 'emma', 'emma@g.cn', 3, 18);
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f5', 'jack', 'jack@g.cn', 3, 19);
INSERT INTO customer (id, name, email, state, age) VALUES ('b90daa19-c243-417a-bded-bb4156ddf2f6', 'tom', 'tom@g.cn', 1, 20);

/* Product */
INSERT INTO PRODUCT (ID,PRODUCT_TYPE,PRODUCT_NAME,PRODUCT_STATUS, YEAR_RATE, PRODUCT_DESC,INVEST_MIN_AMOUNT,INVEST_MAX_AMOUNT,ENABLE_STATUS,CREATE_DATE) 
            values ('1','1','月月赢','开放中', 8,'1元起投 随进随出',1,500000,'启用','2015-12-12');
INSERT INTO PRODUCT (ID,PRODUCT_TYPE,PRODUCT_NAME,PRODUCT_STATUS, YEAR_RATE,PRODUCT_DESC,INVEST_MIN_AMOUNT,INVEST_MAX_AMOUNT,ENABLE_STATUS,CREATE_DATE) 
            values ('2','1','灵活宝','开放中', 8, '1元起投 随进随出',1,500000,'启用','2015-12-12');
/* Product Details */
INSERT INTO PRODUCT_DETAIL (ID,PRODUCT_ID,ALREADY_INVEST_PEOPLE,ALREADY_INVEST_AMOUNT,PARTAKE_ORGANIZS,PARTAKE_CRERIGS,ACCUMULATIVE_LUCRE,CURR_USABLE_VALUE,CREATE_USER,CREATE_DATE,LAST_UPDATE_USER,LAST_UPDATE_DATE,VERSION,RECORD_STATUS,CURR_TERM,OPEN_DATE) 
			values ('1','2',115,3816000,5,18,743513.6144,990320.8930,'admin','2015-11-22','root','2015-12-26',1,'启用','T2016001046','2016-2-12');