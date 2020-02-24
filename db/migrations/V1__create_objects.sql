create table ressignifica.assisted (
  id bigint not null,
  name character varying(100) not null
);

alter table ressignifica.assisted add constraint assisted_pk primary key (id);

create sequence ressignifica.assisted_id_seq
  start with 1
  increment by 1
  no minvalue
  no maxvalue
  cache 1
;

alter table ressignifica.assisted
  alter column id set default nextval('ressignifica.assisted_id_seq'::regclass)
;

alter table ressignifica.assisted owner to ressignifica;

alter table ressignifica.assisted_id_seq owner to ressignifica;
