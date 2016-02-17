drop table customer_state if exists;
drop table customer if exists;
drop table PRODUCT_DETAIL if exists;
drop table PRODUCT if exists;

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

create table PRODUCT_DETAIL (
	ID VARCHAR2(50), 
	ALREADY_INVEST_PEOPLE INT, 
	ALREADY_INVEST_AMOUNT NUMBER(22,4), 
	PARTAKE_ORGANIZS INT, 
	PARTAKE_CRERIGS INT, 
	ACCUMULATIVE_LUCRE DECIMAL(22,4), 
	CURR_USABLE_VALUE DECIMAL(22,4), 
	CREATE_USER VARCHAR2(50), 
	CREATE_DATE DATE, 
	LAST_UPDATE_USER VARCHAR2(50), 
	LAST_UPDATE_DATE DATE, 
	VERSION INT, 
	MEMO VARCHAR2(300), 
	RECORD_STATUS VARCHAR2(50), 
	CURR_TERM VARCHAR2(50), 
	OPEN_DATE DATE,
	CONSTRAINT PK_PRODUCT_DETAIL PRIMARY KEY (ID)
);
create table PRODUCT (
	ID                   VARCHAR2(50)                   not null,
	RRODUCT_DETAIL_ID	 VARCHAR2(50)                   not null,
	PRODUCT_CODE         VARCHAR2(50)                   null,
	PRODUCT_TYPE         VARCHAR2(50)                   not null,
	PRODUCT_NAME         VARCHAR2(150)                  null,
	PRODUCT_STATUS       VARCHAR2(50)                   null,
	YEAR_RATE			 NUMBER(22,8)					not null,
	TYPE_TERM            INT                        null,
	SEAT_TERM            INT                        null,
	INVEST_MIN_AMOUNT    NUMBER(22,8)                   null,
	INVEST_MAX_AMOUNT    NUMBER(22,8)                   null,
	PLAN_TOTAL_AMOUNT    NUMBER(22,8)                   null,
	ENSURE_METHOD        VARCHAR2(50)                   null,
   	INVEST_BEARINTE_METHOD VARCHAR2(50)                 null,
   	PRODUCT_DESC         VARCHAR2(2000)                 null,
   	SERVICE_CHARGE_RATE  NUMBER(22,18)                  null,
   	ENABLE_STATUS        VARCHAR2(50)                   null,
   	CREATE_USER          VARCHAR2(50)                   null,
   	CREATE_DATE          DATE                           not null,
   	LAST_UPDATE_USER     VARCHAR2(50)                   null,
   	LAST_UPDATE_DATE     DATE                           null,
   	VERSION              INT                        null,
   	MEMO                 VARCHAR2(300)                  null,
   	constraint PK_PRODUCT primary key (ID),
   	CONSTRAINT FK_PRODUCT_DETAIL_ID FOREIGN KEY(RRODUCT_DETAIL_ID) REFERENCES PRODUCT_DETAIL(ID)
);



