
    create table article (
       id integer not null auto_increment,
        category varchar(255),
        date date,
        description TEXT,
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table comments (
       id integer not null auto_increment,
        content TEXT,
        fk_article integer,
        subscriber_id integer not null,
        primary key (id)
    ) engine=InnoDB;

    create table customer_bought_services (
       customer_id integer not null,
        bought_service_id integer not null
    ) engine=InnoDB;

    create table customers (
       id integer not null auto_increment,
        address varchar(255),
        cap integer not null,
        city varchar(255),
        date_of_birth date,
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        password varchar(255),
        phone_number varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table faqs (
       id integer not null auto_increment,
        answer TEXT,
        question varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table logins (
       id integer not null auto_increment,
        action varchar(255),
        email varchar(255),
        local_date_time datetime,
        password varchar(255),
        sub_id integer not null,
        username varchar(255),
        subscriber_id integer not null,
        primary key (id)
    ) engine=InnoDB;

    create table service_bought_service (
       bought_id integer not null,
        service_id integer not null
    ) engine=InnoDB;

    create table services (
       id integer not null auto_increment,
        description TEXT,
        img varchar(255),
        price decimal(38,2),
        rate integer not null,
        title varchar(255),
        primary key (id)
    ) engine=InnoDB;

    create table services_bought (
       id integer not null auto_increment,
        local_date_time datetime,
        order_status varchar(255),
        paid bit not null,
        quantity integer not null,
        primary key (id)
    ) engine=InnoDB;

    create table subscribers (
       id integer not null auto_increment,
        address varchar(255),
        cap integer not null,
        city varchar(255),
        date_of_birth date,
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        password varchar(255),
        phone_number varchar(255),
        username varchar(255),
        primary key (id)
    ) engine=InnoDB;

    alter table customers 
       add constraint UK_rfbvkrffamfql7cjmen8v976v unique (email);

    alter table customers 
       add constraint UK_6v6x92wb400iwh6unf5rwiim4 unique (phone_number);

    alter table subscribers 
       add constraint UK_e65wvbb19pmpo5f1u3w216i5j unique (email);

    alter table subscribers 
       add constraint UK_fbwyuuqutr98wx8ero1tffhe4 unique (username);

    alter table comments 
       add constraint FKbqe1d1jxjf5ks3bovvhdsa6s6 
       foreign key (fk_article) 
       references article (id);

    alter table comments 
       add constraint FKnn4ankc4goqjivpk5aix8hffc 
       foreign key (subscriber_id) 
       references subscribers (id);

    alter table customer_bought_services 
       add constraint FKydh1ko2il67tnjpo71rmid95 
       foreign key (bought_service_id) 
       references services_bought (id);

    alter table customer_bought_services 
       add constraint FKdbi47y9l41a0hvs4cl1ppm75k 
       foreign key (customer_id) 
       references customers (id);

    alter table logins 
       add constraint FKct5doqfgc1x472ibm4cy457pg 
       foreign key (subscriber_id) 
       references subscribers (id);

    alter table service_bought_service 
       add constraint FK7rmjdma5f1p28k6gftyynp11p 
       foreign key (service_id) 
       references services (id);

    alter table service_bought_service 
       add constraint FKabxn633vbkjftcg1mmxjdu8bh 
       foreign key (bought_id) 
       references services_bought (id);
