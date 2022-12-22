--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" date DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '82923034-a3e6-43c6-b8e7-0fc37dd07ec9');
INSERT INTO public.sessions VALUES (2, 2, '69fd1380-188e-4ad4-be29-f37940a438da');
INSERT INTO public.sessions VALUES (3, 3, 'b7b2cd25-25da-4db3-a18e-1c6185321ca7');
INSERT INTO public.sessions VALUES (4, 3, '41f98318-af70-494d-9bbd-6996fa81c299');
INSERT INTO public.sessions VALUES (5, 1, '3c548318-201d-478d-b15b-300d97794a4b');
INSERT INTO public.sessions VALUES (6, 1, 'e2a2f36a-24de-47e9-bfaa-993853177c55');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (7, 'https://open.spotify.com/collection/artists', 3, 'JkKKq5XBuYr6SaaBGtRHW', 0, '2022-12-22');
INSERT INTO public.urls VALUES (8, 'https://www.netflix.com/browse', 3, 'iRowMd-5_ozIxk3F7Womo', 3, '2022-12-22');
INSERT INTO public.urls VALUES (4, 'https://www.youtube.com', 1, 'CKwQ7KPto74O41BvJa3uI', 5, '2022-12-21');
INSERT INTO public.urls VALUES (6, 'https://ge.globo.com/', 2, 'D1FSX9iOqU5VFgTNyV20r', 1, '2022-12-21');
INSERT INTO public.urls VALUES (3, 'https://www.youtube.com/@estudosemfisicaematematica', 1, 'bCH0rMSpR_vUNiijvHiak', 6, '2022-12-21');
INSERT INTO public.urls VALUES (5, 'https://www.google.com', 1, '20mZs5j-GmDz-1MS0gqUO', 4, '2022-12-21');
INSERT INTO public.urls VALUES (10, 'https://www.notion.so/bootcampra/Projeto-Shortly-API-3ef2afe78c254d069f862c036efa6f04', 3, 'l4dW0tRw_JKckOGPNLX7f', 1, '2022-12-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Luna', 'luna@hotmail.com', '$2b$10$mg0/7.IAnl6Ku67HSNbFr.NZruhjYo5c.qA/8AH8i7ZA6Ra4WEV2i', '2022-12-20');
INSERT INTO public.users VALUES (2, 'teste', 'teste@teste.com', '$2b$10$bMulnsD0p3.iByjNQ9ytC.Iviz6pKr3e1oL.hEk8F.eqDTHaH5idm', '2022-12-21');
INSERT INTO public.users VALUES (3, 'teste2', 'teste2@teste2.com', '$2b$10$6a27jYS7.KbxS3wOzLB38OJUvdMbyu5pHbNPMW8n4i318J277r.f6', '2022-12-22');
INSERT INTO public.users VALUES (4, 'teste3', 'teste3@teste3.com', '$2b$10$rw3P7smGtP16MjkX3/9C3eHhitAj7ezJ8HNKzZHUEgpCSe1vYmRXK', '2022-12-22');
INSERT INTO public.users VALUES (5, 'teste4', 'teste4@teste4.com', '$2b$10$c2RBtdM.iD2dTkbvxj6caeScza0ToaWob.9JDWGsZWqmsL5MXuI.K', '2022-12-22');
INSERT INTO public.users VALUES (6, 'teste5', 'teste5@teste5.com', '$2b$10$pFkVWrp2jURDcOBj3xthRuQmsoP5f1i1CeEz8QTE9zJhdkl3Z2.0S', '2022-12-22');
INSERT INTO public.users VALUES (7, 'teste6', 'teste6@teste6.com', '$2b$10$QpQF2.U7tpnoNZy7jNma1eoup5kp6dgc2BxngzIwsawNPFqeAzfOm', '2022-12-22');
INSERT INTO public.users VALUES (8, 'teste7', 'teste7@teste7.com', '$2b$10$zr54sFNcJl2UOK6NZUZ0veyNqNEU5c.mXKmcIa0ytDM6vofTxIbP2', '2022-12-22');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

