--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

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

--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (id, email, firstname, street_address, city, state, code, phone_number, user_id) FROM stdin;
2	sumanpareek442@gmail.com	AYUSH	green garden kottapuram	thrissur	Kerala	680004	9746557300	2
3	sumanpareek442@gmail.com	AYUSH	green garden kottapuram	thrissur	Kerala	680004	9746557300	2
\.


--
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
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, user_id, product_id, quantity, added_at, category, color, size) FROM stdin;
83	17	11	1	2025-09-11 19:29:04.192734	socks	Black	
89	19	27	1	2025-09-12 19:58:41.480011	Women	Pink	32
\.


--
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
-- Data for Name: search_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.search_history (id, user_id, search_term, searched_at) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
lsrzwWXGxiFtK15xrQvJg4CacofeXaUj	{"cookie":{"originalMaxAge":86400000,"expires":"2025-09-12T16:30:36.243Z","httpOnly":true,"path":"/"},"user":{"id":19,"username":"agsdjsadasdbab11@gmail.com"}}	2025-09-13 20:27:12
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 3, true);


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 89, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 15, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 24, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 29, true);


--
-- Name: search_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.search_history_id_seq', 1, false);


--
-- Name: user_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_table_id_seq', 19, true);


--
-- PostgreSQL database dump complete
--

