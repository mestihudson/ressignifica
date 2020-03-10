create table ressignifica.reception (
  id bigint not null,
  name character varying(100) not null
);

alter table ressignifica.reception add constraint reception_pk primary key (id);

create sequence ressignifica.reception_id_seq
  start with 1
  increment by 1
  no minvalue
  no maxvalue
  cache 1
;

alter table ressignifica.reception
  alter column id set default nextval('ressignifica.reception_id_seq'::regclass)
;

alter table ressignifica.reception owner to ressignifica;

alter table ressignifica.reception_id_seq owner to ressignifica;
