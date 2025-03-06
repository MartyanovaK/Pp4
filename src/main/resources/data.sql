insert into roles (role) value ('ROLE_ADMIN');
insert into roles (role) value ('ROLE_USER');

INSERT INTO users (age, name, last_name, email, password) VALUES ('23', 'Boris', 'Ivanov', 'admin@mail.ru', '$2a$08$rpiT312X4Vq5.3U685EI9e4UrTvrB2hnr2fF1dbviq1p.nF5bnCtC');
INSERT INTO users (age, name, last_name, email, password) VALUES ('22', 'Ivan', 'Borisov', 'user@gmail.ru', '$2a$08$j.2li2T86pya1o/RqPAMoO1SadL/nA/9qVi/RMLcgsr6T2XK00fvW');
INSERT users_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE email = 'user@gmail.ru'), (SELECT id FROM roles WHERE role = 'ROLE_USER'));
INSERT users_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE email = 'admin@mail.ru'), (SELECT id FROM roles WHERE role = 'ROLE_ADMIN'));
INSERT users_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE email = 'admin@mail.ru'), (SELECT id FROM roles WHERE role = 'ROLE_USER'));