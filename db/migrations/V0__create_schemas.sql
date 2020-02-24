drop role if exists ressignifica;

create role ressignifica with login encrypted password 'ressignifica@12345678';

drop schema if exists ressignifica cascade;

create schema ressignifica;

alter schema ressignifica owner to ressignifica;
