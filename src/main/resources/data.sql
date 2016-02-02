/* STATE */
INSERT INTO customer_state (id, description) VALUES (1, 'normal');
INSERT INTO customer_state (id, description) VALUES (2, 'frozed');
INSERT INTO customer_state (id, description) VALUES (3, 'deleted');
/* CUSTOMERS */
INSERT INTO customer (id, name, email, state, age) VALUES ('1', 'marissa', 'marissa@g.cn', 1, 28);
INSERT INTO customer (id, name, email, state, age) VALUES ('2', 'john', 'john@g.cn', 1, 23);
INSERT INTO customer (id, name, email, state, age) VALUES ('3', 'alex', 'alex@g.cn', 2, 18);
INSERT INTO customer (id, name, email, state, age) VALUES ('4', 'emma', 'emma@g.cn', 3, 18);



