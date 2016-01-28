create table customer_state (
	id int NOT NULL PRIMARY KEY,
	description varchar(64) NOT NULL
);

create table customer (
	id varchar(50) NOT NULL PRIMARY KEY,
	name varchar(64) NOT NULL,
	email varchar(64) NOT NULL,
	state int NOT NULL,
	age int,
	FOREIGN KEY (state) REFERENCES customer_state(id)
);

