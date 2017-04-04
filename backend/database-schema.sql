create table customer (id bigint not null auto_increment, city varchar(255), street varchar(255), street_no varchar(255), zip_code varchar(255), name varchar(255) not null, uuid binary(255) not null, primary key (id))
create table shipment (id bigint not null auto_increment, cargo_description varchar(255) not null, dangerous_goods bit not null, export_customs_clearance bit not null, export_insurance bit not null, flight bit not null, import_customs_clearance bit not null, import_insurance bit not null, number_packages integer not null, on_carriage bit not null, pre_carriage bit not null, receiver_is_employer bit not null, sender_is_employer bit not null, total_capacity double precision not null, total_weight double precision not null, tracking_id varchar(255), uuid_receiver binary(255) not null, uuid_sender binary(255) not null, receiver_id bigint not null, sender_id bigint not null, primary key (id))
alter table shipment add constraint UK_bgj4c1bm89aoqdnscu6v85rkt unique (tracking_id)
alter table shipment add constraint FK4iqnob9nyy36e497kqfovf7po foreign key (receiver_id) references customer (id)
alter table shipment add constraint FK6fjq37nx2gsc584yc0eaecwwf foreign key (sender_id) references customer (id)
