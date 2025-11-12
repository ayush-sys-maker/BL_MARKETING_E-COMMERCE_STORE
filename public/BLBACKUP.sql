--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-11-06 18:41:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 231 (class 1259 OID 24901)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    id integer NOT NULL,
    email character varying(150),
    firstname character varying(150),
    street_address character varying(500),
    city character varying(150),
    state character varying(150),
    code integer,
    phone_number bigint,
    user_id integer
);


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24900)
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.address_id_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 230
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- TOC entry 222 (class 1259 OID 24784)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    quantity integer DEFAULT 1,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category character varying(50),
    color character varying(150),
    size character varying(150)
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24783)
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 221
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- TOC entry 228 (class 1259 OID 24837)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24836)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 226 (class 1259 OID 24823)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    total_amount numeric(10,2) NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'Pending'::character varying,
    payment_status character varying(150)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24822)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 220 (class 1259 OID 24765)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    category character varying(50) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    color character varying(150),
    size character varying(150),
    mobile_image_url text,
    desktop_image_url text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24764)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 224 (class 1259 OID 24803)
-- Name: search_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_history (
    id integer NOT NULL,
    user_id integer,
    search_term character varying(255) NOT NULL,
    searched_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.search_history OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24802)
-- Name: search_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.search_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.search_history_id_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 223
-- Name: search_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.search_history_id_seq OWNED BY public.search_history.id;


--
-- TOC entry 229 (class 1259 OID 24872)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16628)
-- Name: user_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_table (
    id integer NOT NULL,
    username character varying(150),
    password character varying(150),
    name character varying(150)
);


ALTER TABLE public.user_table OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16627)
-- Name: user_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_table_id_seq OWNER TO postgres;

--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_table_id_seq OWNED BY public.user_table.id;


--
-- TOC entry 4788 (class 2604 OID 24916)
-- Name: address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- TOC entry 4779 (class 2604 OID 24917)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 24918)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 24919)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 24920)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 24921)
-- Name: search_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_history ALTER COLUMN id SET DEFAULT nextval('public.search_history_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 24922)
-- Name: user_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table ALTER COLUMN id SET DEFAULT nextval('public.user_table_id_seq'::regclass);


--
-- TOC entry 4971 (class 0 OID 24901)
-- Dependencies: 231
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (id, email, firstname, street_address, city, state, code, phone_number, user_id) FROM stdin;
2	sumanpareek442@gmail.com	AYUSH	green garden kottapuram	thrissur	Kerala	680004	9746557300	2
3	sumanpareek442@gmail.com	AYUSH	green garden kottapuram	thrissur	Kerala	680004	9746557300	2
\.


--
-- TOC entry 4962 (class 0 OID 24784)
-- Dependencies: 222
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, user_id, product_id, quantity, added_at, category, color, size) FROM stdin;
83	17	11	1	2025-09-11 19:29:04.192734	socks	Black	
89	19	27	1	2025-09-12 19:58:41.480011	Women	Pink	32
\.


--
-- TOC entry 4968 (class 0 OID 24837)
-- Dependencies: 228
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, price) FROM stdin;
9	19	2	1	399.00
10	19	2	1	399.00
11	20	3	1	399.00
12	21	4	1	399.00
13	22	27	1	155.00
14	23	27	1	155.00
15	24	27	1	155.00
\.


--
-- TOC entry 4966 (class 0 OID 24823)
-- Dependencies: 226
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total_amount, order_date, status, payment_status) FROM stdin;
19	16	798.00	2025-09-09 11:46:52.740381	Pending	Paid
20	17	404.00	2025-09-11 16:09:18.812596	Pending	Paid
21	18	404.00	2025-09-11 21:48:45.637418	Pending	Paid
22	19	160.00	2025-09-12 18:56:08.739087	Pending	Paid
23	19	224.00	2025-09-12 19:58:49.0371	Pending	Paid
24	19	224.00	2025-09-12 20:05:56.129467	Pending	cod
\.


--
-- TOC entry 4960 (class 0 OID 24765)
-- Dependencies: 220
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, category, description, price, created_at, color, size, mobile_image_url, desktop_image_url) FROM stdin;
7	Filla Cargo	Sportswear	\N	399.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts6.jpg	/shortsdesk6.jpg
27	ID FOAM	Women	\N	155.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra7.jpg	/bra7desk.jpg
11	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks1.jpg	/socks1desk.jpg
12	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks2.jpg	/socks2desk.jpg
3	NS LYCRA 108	Sportswear	\N	249.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/short5.jpg	/shortsdesk2.jpg
13	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks3.jpg	/socksdesk3.jpg
8	NS LYCRA 104	Sportswear	\N	399.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts4.jpg	/shortsdesk7.jpg
14	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks4.jpg	/socksdesk4.jpg
9	 FORWAY LYCRA 5103	Sportswear	\N	499.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts7.jpg	/shortsdesk8.jpg
10	 FORWAY LYCRA 102	Sportswear	\N	499.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts8.jpg	/shorts8.jpg
15	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks6.jpg	/socks6.jpg
16	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks7.jpg	/socks7.jpg
17	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks 8.jpg	/socks 8.jpg
21	RAINBOW MOLD BRA	Women	\N	183.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra1.jpg	/bradesk1.jpg
18	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks 9.jpg	/socks 9.jpg
19	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks10.jpg	/socks10.jpg
20	ANKLE SOCKS	socks	\N	70.00	2025-09-11 19:02:29.302099	Black, White, Grey, Red, Blue, Green, Yellow	Free Size	/socks 11.jpg	/socks 11.jpg
22	FOUR SQUARE MOLD	Women	\N	158.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra2.jpg	/bradesk2.jpg
2	BRA	women	comfort	399.00	2025-09-03 14:40:17.848278	RED,BLUE,BLACK	L,XL,XXL,3XL	\N	\N
4	NS LYCRA 109	Sportswear	\N	249.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts2.jpg	/shortsdesk3.jpg
5	NS LYCRA 106	Sportswear	\N	249.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts1.jpg	/shortsdesk4.jpg
6	NS LYCRA 107	Sportswear	\N	249.00	2025-09-11 12:13:27.488421	BLACK,BLUE,GREY,GREEN	L,XL,XXL,3XL	/shorts3.jpg	/shortsdesk5.jpg
23	CHINA SPORTS	Women	\N	110.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra3desk.jpg	/bra3desk.png
24	COOL FORM 	Women	\N	148.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra4.jpg	/bra4desk.jpg
25	999 SPORTS	Women	\N	399.00	2025-09-11 19:08:17.138486	Mehroon,Pink,Red,Black,Violet,Blue	30,32,34,36,38,40	/bra5.jpg	/bra4desk.png
\.


--
-- TOC entry 4964 (class 0 OID 24803)
-- Dependencies: 224
-- Data for Name: search_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.search_history (id, user_id, search_term, searched_at) FROM stdin;
\.


--
-- TOC entry 4969 (class 0 OID 24872)
-- Dependencies: 229
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
lsrzwWXGxiFtK15xrQvJg4CacofeXaUj	{"cookie":{"originalMaxAge":86400000,"expires":"2025-09-12T16:30:36.243Z","httpOnly":true,"path":"/"},"user":{"id":19,"username":"agsdjsadasdbab11@gmail.com"}}	2025-09-13 20:27:12
\.


--
-- TOC entry 4958 (class 0 OID 16628)
-- Dependencies: 218
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_table (id, username, password, name) FROM stdin;
15	vedupareek02@gmail.com	$2b$10$dBk68phcsTPdT1kae44MN.1k5y.NCq9dWhT2.LammgA7RNUBCkAWe	\N
16	ashishpareek01@gmail.com	$2b$10$C0xeRdZ.J89eepDK7hn6XOKzyfJu6IFAyIAOGhoFuSls3FY3sd6GO	\N
17	sumanpareek442@gmail.com	$2b$10$cFDbIcEoWKrcoCTEbr.0uuP0/EoFswplEdamp7/ShJyLkuQrPJAz2	\N
18	shivapareek111@gmail.com	$2b$10$XHH.VMnkgdfdgf1/SIIqy.MU85G9cqzCVb01MOAucFdZExaOEK3Ie	\N
19	agsdjsadasdbab11@gmail.com	$2b$10$sLkswA318YVabAnvn7I47ucM.u/C0tYqaysIsFNiqzzQvCEsH28f6	raju
\.


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 230
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 3, true);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 221
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 89, true);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 15, true);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 24, true);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 29, true);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 223
-- Name: search_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.search_history_id_seq', 1, false);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_table_id_seq', 19, true);


--
-- TOC entry 4805 (class 2606 OID 24908)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 24791)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4800 (class 2606 OID 24842)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4798 (class 2606 OID 24830)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 24773)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 24809)
-- Name: search_history search_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4803 (class 2606 OID 24878)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4790 (class 2606 OID 16633)
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (id);


--
-- TOC entry 4801 (class 1259 OID 24879)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 4806 (class 2606 OID 24797)
-- Name: cart cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 24792)
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_table(id) ON DELETE CASCADE;


--
-- TOC entry 4810 (class 2606 OID 24843)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 4811 (class 2606 OID 24848)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4809 (class 2606 OID 24831)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_table(id) ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 24810)
-- Name: search_history search_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_table(id) ON DELETE CASCADE;


-- Completed on 2025-11-06 18:41:38

--
-- PostgreSQL database dump complete
--

