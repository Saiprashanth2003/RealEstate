use project;


CREATE TABLE agent(
agent_id INT,
agent_name VARCHAR(100),
agent_phone VARCHAR(10),
agent_email VARCHAR(50),
agent_password VARCHAR(50),
PRIMARY KEY(agent_id)
);

CREATE TABLE buyer(
buyer_id INT,
buyer_name VARCHAR(100),
buyer_phone VARCHAR(10),
buyer_email VARCHAR(50),
buyer_password VARCHAR(50),
PRIMARY KEY(buyer_id)
);

CREATE TABLE tenant(
tenant_id INT,
tenant_name VARCHAR(100),
tenant_phone VARCHAR(10),
tenant_email VARCHAR(50),
tenant_password VARCHAR(50),
PRIMARY KEY(tenant_id)
);

CREATE TABLE owner(
owner_id INT,
owner_name VARCHAR(100),
owner_phone VARCHAR(10),
owner_email VARCHAR(50),
owner_password VARCHAR(50),
PRIMARY KEY(owner_id)
);

CREATE TABLE seller(
seller_id INT,
seller_name VARCHAR(100),
seller_phone VARCHAR(10),
seller_email VARCHAR(50),
seller_password VARCHAR(50),
PRIMARY KEY(seller_id)
);


CREATE TABLE pfr(
property_id INT,
property_hno VARCHAR(10),
property_street VARCHAR(50),
property_city VARCHAR(50),
property_pincode INT,
property_area VARCHAR(50),
property_rent VARCHAR(50),
property_bhk INT,
property_year INT,
property_info VARCHAR(200),
owner_id INT,
agent_id INT,
PRIMARY KEY(property_id),
FOREIGN KEY(owner_id) REFERENCES owner(owner_id),
FOREIGN KEY(agent_id) REFERENCES agent(agent_id)
);

CREATE TABLE pfs(
property_id INT,
property_hno VARCHAR(10),
property_street VARCHAR(50),
property_city VARCHAR(50),
property_pincode INT,
property_area VARCHAR(50),
property_price VARCHAR(50),
property_bhk INT,
property_year INT,
property_info VARCHAR(200),
seller_id INT,
agent_id INT,
PRIMARY KEY(property_id),
FOREIGN KEY(seller_id) REFERENCES seller(seller_id),
FOREIGN KEY(agent_id) REFERENCES agent(agent_id)
);


CREATE TABLE transactionforsale(
transaction_id INT,
property_id INT,
agent_id INT,
buyer_id INT,
seller_id INT,
transaction_date DATE,
transaction_amount VARCHAR(50),
transaction_gst VARCHAR(50),
PRIMARY KEY(transaction_id)
);

CREATE TABLE transactionforrent(
transaction_id INT,
property_id INT,
agent_id INT,
tenant_id INT,
owner_id INT,
transaction_date DATE,
transaction_amount VARCHAR(50),
transaction_gst VARCHAR(50),
PRIMARY KEY(transaction_id)
);


insert into agent values(1,'deepak','9141460412','deepak@gmail.com','deepak#2003'),
(2,'sai','9876543219','sai@gmail.com','sai#2003'),
(3,'prashanth','9765432189','prashanth@gmail.com','prashanth#2003'),
(4,'bharath','9865432179','bharath@gmail.com','bharath#2003'),
(5,'medha','9875432169','medha@gmail.com','medha#2003');

insert into buyer values(1,'deepak','9141460412','deepak@gmail.com','deepak#2003'),
(2,'sai','15000','sai@gmail.com','sai#2003'),
(3,'prashanth','9765432189','prashanth@gmail.com','prashanth#2003'),
(4,'bharath','9865432179','bharath@gmail.com','bharath#2003'),
(5,'medha','65000','medha@gmail.com','medha#2003');

insert into tenant values(1,'deepak','9141460412','deepak@gmail.com','deepak#2003'),
(2,'sai','9876543219','sai@gmail.com','sai#2003'),
(3,'prashanth','9765432189','prashanth@gmail.com','prashanth#2003'),
(4,'bharath','9865432179','bharath@gmail.com','bharath#2003'),
(5,'medha','9875432169','medha@gmail.com','medha#2003');

insert into owner values(1,'deepak','9141460412','deepak@gmail.com','deepak#2003'),
(2,'sai','9876543219','sai@gmail.com','sai#2003'),
(3,'prashanth','9765432189','prashanth@gmail.com','prashanth#2003'),
(4,'bharath','9865432179','bharath@gmail.com','bharath#2003'),
(5,'medha','9875432169','medha@gmail.com','medha#2003');

insert into seller values(1,'deepak','9141460412','deepak@gmail.com','deepak#2003'),
(2,'sai','9876543219','sai@gmail.com','sai#2003'),
(3,'prashanth','9765432189','prashanth@gmail.com','prasthanth#2003'),
(4,'bharath','9865432179','bharath@gmail.com','bharath#2003'),
(5,'medha','9875432169','medha@gmail.com','medha#2003');

insert into pfs values(1,'24/7-65','FCI','Hyderabad',600024,'Miyapur','25000',3,2003,'East facing',3,3),
(2,'24/3-65','FCA','Hyderabad',600022,'ChandaNagar','55000',2,2008,'West facing',1,1),
(3,'21/7-65','Homly','Ananthapur',500024,'Hammi','45000',1,2015,'North facing',2,2),
(4,'19/7-65','SBI','Gadwal',700024,'Gammi','900000',5,2021,'South facing',4,4),
(5,'98/7-65','BOB','Vizag',400024,'Jagadamba','87000',1,2001,'North facing',5,5);

insert into pfr values(10,'23/7-65','FCI','Hyderabad',600024,'Miyapur','25000',3,2003,'East facing',3,3),
(6,'21/3-65','FCA','Hyderabad',600022,'ChandaNagar','55000',2,2008,'West facing',1,1),
(7,'20/7-65','Homly','Ananthapur',500024,'Hammi','45000',1,2015,'North facing',2,2),
(8,'90/7-65','SBI','Gadwal',700024,'Gammi','900000',5,2021,'South facing',4,4),
(9,'87/7-65','BOB','Vizag',400024,'Jagadamba','87000',1,2001,'North facing',5,5);

insert into transactionforsale values(0,0,0,0,0,'0000-01-01','0','0');
insert into transactionforrent values(0,0,0,0,0,'0000-01-01','0','0');








