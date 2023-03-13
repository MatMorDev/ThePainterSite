
    alter table comments 
       drop 
       foreign key FKbqe1d1jxjf5ks3bovvhdsa6s6;

    alter table comments 
       drop 
       foreign key FKnn4ankc4goqjivpk5aix8hffc;

    alter table customer_bought_services 
       drop 
       foreign key FKydh1ko2il67tnjpo71rmid95;

    alter table customer_bought_services 
       drop 
       foreign key FKdbi47y9l41a0hvs4cl1ppm75k;

    alter table logins 
       drop 
       foreign key FKct5doqfgc1x472ibm4cy457pg;

    alter table service_bought_service 
       drop 
       foreign key FK7rmjdma5f1p28k6gftyynp11p;

    alter table service_bought_service 
       drop 
       foreign key FKabxn633vbkjftcg1mmxjdu8bh;

    drop table if exists article;

    drop table if exists comments;

    drop table if exists customer_bought_services;

    drop table if exists customers;

    drop table if exists faqs;

    drop table if exists logins;

    drop table if exists service_bought_service;

    drop table if exists services;

    drop table if exists services_bought;

    drop table if exists subscribers;
