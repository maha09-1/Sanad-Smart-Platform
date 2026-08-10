--
-- PostgreSQL database dump
--

\restrict 0cfMLynD8hu5Ny1UCj1fgKRPM7CCB9jMFwcxQkubYNKBSNNfCwPt4HDVt0Qbk2L

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-09 21:48:33

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
-- TOC entry 230 (class 1259 OID 16484)
-- Name: interests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interests (
    interest_id bigint NOT NULL,
    interest_name character varying(100) NOT NULL
);


ALTER TABLE public.interests OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16483)
-- Name: interests_interest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interests_interest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interests_interest_id_seq OWNER TO postgres;

--
-- TOC entry 5218 (class 0 OID 0)
-- Dependencies: 229
-- Name: interests_interest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interests_interest_id_seq OWNED BY public.interests.interest_id;


--
-- TOC entry 232 (class 1259 OID 16495)
-- Name: member_interests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member_interests (
    member_interest_id bigint NOT NULL,
    team_member_id bigint NOT NULL,
    interest_id bigint NOT NULL
);


ALTER TABLE public.member_interests OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16494)
-- Name: member_interests_member_interest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_interests_member_interest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.member_interests_member_interest_id_seq OWNER TO postgres;

--
-- TOC entry 5219 (class 0 OID 0)
-- Dependencies: 231
-- Name: member_interests_member_interest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_interests_member_interest_id_seq OWNED BY public.member_interests.member_interest_id;


--
-- TOC entry 228 (class 1259 OID 16460)
-- Name: member_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member_skills (
    member_skill_id bigint NOT NULL,
    team_member_id bigint NOT NULL,
    skill_id bigint NOT NULL,
    proficiency_level smallint NOT NULL,
    CONSTRAINT member_skills_proficiency_level_check CHECK (((proficiency_level >= 1) AND (proficiency_level <= 5)))
);


ALTER TABLE public.member_skills OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16459)
-- Name: member_skills_member_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_skills_member_skill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.member_skills_member_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5220 (class 0 OID 0)
-- Dependencies: 227
-- Name: member_skills_member_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_skills_member_skill_id_seq OWNED BY public.member_skills.member_skill_id;


--
-- TOC entry 246 (class 1259 OID 16672)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    notification_id bigint NOT NULL,
    user_id bigint NOT NULL,
    task_id bigint,
    notification_type character varying(50) NOT NULL,
    title character varying(200) NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16671)
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_notification_id_seq OWNER TO postgres;

--
-- TOC entry 5221 (class 0 OID 0)
-- Dependencies: 245
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- TOC entry 238 (class 1259 OID 16568)
-- Name: phases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phases (
    phase_id bigint NOT NULL,
    project_id bigint NOT NULL,
    phase_name character varying(150) NOT NULL,
    description text,
    phase_order integer NOT NULL,
    start_date date,
    due_date date,
    status character varying(30) DEFAULT 'pending'::character varying NOT NULL,
    CONSTRAINT phases_phase_order_check CHECK ((phase_order > 0)),
    CONSTRAINT phases_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'in_progress'::character varying, 'completed'::character varying])::text[])))
);


ALTER TABLE public.phases OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16567)
-- Name: phases_phase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phases_phase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.phases_phase_id_seq OWNER TO postgres;

--
-- TOC entry 5222 (class 0 OID 0)
-- Dependencies: 237
-- Name: phases_phase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phases_phase_id_seq OWNED BY public.phases.phase_id;


--
-- TOC entry 244 (class 1259 OID 16647)
-- Name: progress_updates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress_updates (
    progress_update_id bigint NOT NULL,
    task_id bigint NOT NULL,
    team_member_id bigint,
    progress_percent smallint NOT NULL,
    update_note text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT progress_updates_progress_percent_check CHECK (((progress_percent >= 0) AND (progress_percent <= 100)))
);


ALTER TABLE public.progress_updates OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16646)
-- Name: progress_updates_progress_update_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.progress_updates_progress_update_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_updates_progress_update_id_seq OWNER TO postgres;

--
-- TOC entry 5223 (class 0 OID 0)
-- Dependencies: 243
-- Name: progress_updates_progress_update_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.progress_updates_progress_update_id_seq OWNED BY public.progress_updates.progress_update_id;


--
-- TOC entry 234 (class 1259 OID 16517)
-- Name: project_ideas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_ideas (
    idea_id bigint NOT NULL,
    team_id bigint NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    ai_reasoning text,
    feasibility_score numeric(5,2),
    relevance_score numeric(5,2),
    created_by_ai boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT project_ideas_feasibility_score_check CHECK (((feasibility_score >= (0)::numeric) AND (feasibility_score <= (100)::numeric))),
    CONSTRAINT project_ideas_relevance_score_check CHECK (((relevance_score >= (0)::numeric) AND (relevance_score <= (100)::numeric)))
);


ALTER TABLE public.project_ideas OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16516)
-- Name: project_ideas_idea_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_ideas_idea_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_ideas_idea_id_seq OWNER TO postgres;

--
-- TOC entry 5224 (class 0 OID 0)
-- Dependencies: 233
-- Name: project_ideas_idea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_ideas_idea_id_seq OWNED BY public.project_ideas.idea_id;


--
-- TOC entry 236 (class 1259 OID 16541)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    project_id bigint NOT NULL,
    team_id bigint NOT NULL,
    idea_id bigint,
    project_name character varying(200) NOT NULL,
    description text,
    status character varying(30) DEFAULT 'planning'::character varying NOT NULL,
    start_date date,
    end_date date,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT projects_status_check CHECK (((status)::text = ANY ((ARRAY['planning'::character varying, 'active'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16540)
-- Name: projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_project_id_seq OWNER TO postgres;

--
-- TOC entry 5225 (class 0 OID 0)
-- Dependencies: 235
-- Name: projects_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;


--
-- TOC entry 226 (class 1259 OID 16449)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    skill_id bigint NOT NULL,
    skill_name character varying(100) NOT NULL
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16448)
-- Name: skills_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_skill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5226 (class 0 OID 0)
-- Dependencies: 225
-- Name: skills_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_skill_id_seq OWNED BY public.skills.skill_id;


--
-- TOC entry 242 (class 1259 OID 16620)
-- Name: task_assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_assignments (
    assignment_id bigint NOT NULL,
    task_id bigint NOT NULL,
    team_member_id bigint NOT NULL,
    assigned_by_ai boolean DEFAULT false NOT NULL,
    assignment_score numeric(5,2),
    assigned_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT task_assignments_assignment_score_check CHECK (((assignment_score >= (0)::numeric) AND (assignment_score <= (100)::numeric)))
);


ALTER TABLE public.task_assignments OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16619)
-- Name: task_assignments_assignment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_assignments_assignment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_assignments_assignment_id_seq OWNER TO postgres;

--
-- TOC entry 5227 (class 0 OID 0)
-- Dependencies: 241
-- Name: task_assignments_assignment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_assignments_assignment_id_seq OWNED BY public.task_assignments.assignment_id;


--
-- TOC entry 240 (class 1259 OID 16592)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id bigint NOT NULL,
    phase_id bigint NOT NULL,
    task_title character varying(200) NOT NULL,
    description text,
    priority character varying(20) DEFAULT 'medium'::character varying NOT NULL,
    status character varying(30) DEFAULT 'todo'::character varying NOT NULL,
    progress_percent smallint DEFAULT 0 NOT NULL,
    start_date date,
    due_date date,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT tasks_priority_check CHECK (((priority)::text = ANY ((ARRAY['low'::character varying, 'medium'::character varying, 'high'::character varying, 'critical'::character varying])::text[]))),
    CONSTRAINT tasks_progress_percent_check CHECK (((progress_percent >= 0) AND (progress_percent <= 100))),
    CONSTRAINT tasks_status_check CHECK (((status)::text = ANY ((ARRAY['todo'::character varying, 'in_progress'::character varying, 'completed'::character varying, 'blocked'::character varying])::text[])))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16591)
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_task_id_seq OWNER TO postgres;

--
-- TOC entry 5228 (class 0 OID 0)
-- Dependencies: 239
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- TOC entry 224 (class 1259 OID 16423)
-- Name: team_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team_members (
    team_member_id bigint NOT NULL,
    team_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role character varying(50) DEFAULT 'member'::character varying NOT NULL,
    joined_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.team_members OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16422)
-- Name: team_members_team_member_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_members_team_member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_members_team_member_id_seq OWNER TO postgres;

--
-- TOC entry 5229 (class 0 OID 0)
-- Dependencies: 223
-- Name: team_members_team_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.team_members_team_member_id_seq OWNED BY public.team_members.team_member_id;


--
-- TOC entry 222 (class 1259 OID 16407)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying(150) NOT NULL,
    created_by bigint,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teams_team_id_seq OWNER TO postgres;

--
-- TOC entry 5230 (class 0 OID 0)
-- Dependencies: 221
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- TOC entry 220 (class 1259 OID 16391)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16390)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5231 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4930 (class 2604 OID 16487)
-- Name: interests interest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests ALTER COLUMN interest_id SET DEFAULT nextval('public.interests_interest_id_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 16498)
-- Name: member_interests member_interest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interests ALTER COLUMN member_interest_id SET DEFAULT nextval('public.member_interests_member_interest_id_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 16463)
-- Name: member_skills member_skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_skills ALTER COLUMN member_skill_id SET DEFAULT nextval('public.member_skills_member_skill_id_seq'::regclass);


--
-- TOC entry 4950 (class 2604 OID 16675)
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 16571)
-- Name: phases phase_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phases ALTER COLUMN phase_id SET DEFAULT nextval('public.phases_phase_id_seq'::regclass);


--
-- TOC entry 4948 (class 2604 OID 16650)
-- Name: progress_updates progress_update_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress_updates ALTER COLUMN progress_update_id SET DEFAULT nextval('public.progress_updates_progress_update_id_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 16520)
-- Name: project_ideas idea_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_ideas ALTER COLUMN idea_id SET DEFAULT nextval('public.project_ideas_idea_id_seq'::regclass);


--
-- TOC entry 4935 (class 2604 OID 16544)
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 16452)
-- Name: skills skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN skill_id SET DEFAULT nextval('public.skills_skill_id_seq'::regclass);


--
-- TOC entry 4945 (class 2604 OID 16623)
-- Name: task_assignments assignment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignments ALTER COLUMN assignment_id SET DEFAULT nextval('public.task_assignments_assignment_id_seq'::regclass);


--
-- TOC entry 4940 (class 2604 OID 16595)
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 16426)
-- Name: team_members team_member_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_members ALTER COLUMN team_member_id SET DEFAULT nextval('public.team_members_team_member_id_seq'::regclass);


--
-- TOC entry 4923 (class 2604 OID 16410)
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 16394)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5196 (class 0 OID 16484)
-- Dependencies: 230
-- Data for Name: interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interests (interest_id, interest_name) FROM stdin;
\.


--
-- TOC entry 5198 (class 0 OID 16495)
-- Dependencies: 232
-- Data for Name: member_interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member_interests (member_interest_id, team_member_id, interest_id) FROM stdin;
\.


--
-- TOC entry 5194 (class 0 OID 16460)
-- Dependencies: 228
-- Data for Name: member_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member_skills (member_skill_id, team_member_id, skill_id, proficiency_level) FROM stdin;
\.


--
-- TOC entry 5212 (class 0 OID 16672)
-- Dependencies: 246
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (notification_id, user_id, task_id, notification_type, title, message, is_read, created_at) FROM stdin;
\.


--
-- TOC entry 5204 (class 0 OID 16568)
-- Dependencies: 238
-- Data for Name: phases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phases (phase_id, project_id, phase_name, description, phase_order, start_date, due_date, status) FROM stdin;
\.


--
-- TOC entry 5210 (class 0 OID 16647)
-- Dependencies: 244
-- Data for Name: progress_updates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progress_updates (progress_update_id, task_id, team_member_id, progress_percent, update_note, created_at) FROM stdin;
\.


--
-- TOC entry 5200 (class 0 OID 16517)
-- Dependencies: 234
-- Data for Name: project_ideas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_ideas (idea_id, team_id, title, description, ai_reasoning, feasibility_score, relevance_score, created_by_ai, created_at) FROM stdin;
\.


--
-- TOC entry 5202 (class 0 OID 16541)
-- Dependencies: 236
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (project_id, team_id, idea_id, project_name, description, status, start_date, end_date, created_at) FROM stdin;
\.


--
-- TOC entry 5192 (class 0 OID 16449)
-- Dependencies: 226
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (skill_id, skill_name) FROM stdin;
\.


--
-- TOC entry 5208 (class 0 OID 16620)
-- Dependencies: 242
-- Data for Name: task_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_assignments (assignment_id, task_id, team_member_id, assigned_by_ai, assignment_score, assigned_at) FROM stdin;
\.


--
-- TOC entry 5206 (class 0 OID 16592)
-- Dependencies: 240
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (task_id, phase_id, task_title, description, priority, status, progress_percent, start_date, due_date, completed_at, created_at) FROM stdin;
\.


--
-- TOC entry 5190 (class 0 OID 16423)
-- Dependencies: 224
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team_members (team_member_id, team_id, user_id, role, joined_at) FROM stdin;
\.


--
-- TOC entry 5188 (class 0 OID 16407)
-- Dependencies: 222
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (team_id, team_name, created_by, created_at) FROM stdin;
\.


--
-- TOC entry 5186 (class 0 OID 16391)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, password_hash, created_at) FROM stdin;
\.


--
-- TOC entry 5232 (class 0 OID 0)
-- Dependencies: 229
-- Name: interests_interest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interests_interest_id_seq', 1, false);


--
-- TOC entry 5233 (class 0 OID 0)
-- Dependencies: 231
-- Name: member_interests_member_interest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_interests_member_interest_id_seq', 1, false);


--
-- TOC entry 5234 (class 0 OID 0)
-- Dependencies: 227
-- Name: member_skills_member_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_skills_member_skill_id_seq', 1, false);


--
-- TOC entry 5235 (class 0 OID 0)
-- Dependencies: 245
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, false);


--
-- TOC entry 5236 (class 0 OID 0)
-- Dependencies: 237
-- Name: phases_phase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phases_phase_id_seq', 1, false);


--
-- TOC entry 5237 (class 0 OID 0)
-- Dependencies: 243
-- Name: progress_updates_progress_update_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.progress_updates_progress_update_id_seq', 1, false);


--
-- TOC entry 5238 (class 0 OID 0)
-- Dependencies: 233
-- Name: project_ideas_idea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_ideas_idea_id_seq', 1, false);


--
-- TOC entry 5239 (class 0 OID 0)
-- Dependencies: 235
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 1, false);


--
-- TOC entry 5240 (class 0 OID 0)
-- Dependencies: 225
-- Name: skills_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_skill_id_seq', 1, false);


--
-- TOC entry 5241 (class 0 OID 0)
-- Dependencies: 241
-- Name: task_assignments_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_assignments_assignment_id_seq', 1, false);


--
-- TOC entry 5242 (class 0 OID 0)
-- Dependencies: 239
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 1, false);


--
-- TOC entry 5243 (class 0 OID 0)
-- Dependencies: 223
-- Name: team_members_team_member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_members_team_member_id_seq', 1, false);


--
-- TOC entry 5244 (class 0 OID 0)
-- Dependencies: 221
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 1, false);


--
-- TOC entry 5245 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 4985 (class 2606 OID 16493)
-- Name: interests interests_interest_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_interest_name_key UNIQUE (interest_name);


--
-- TOC entry 4987 (class 2606 OID 16491)
-- Name: interests interests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_pkey PRIMARY KEY (interest_id);


--
-- TOC entry 4990 (class 2606 OID 16503)
-- Name: member_interests member_interests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interests
    ADD CONSTRAINT member_interests_pkey PRIMARY KEY (member_interest_id);


--
-- TOC entry 4992 (class 2606 OID 16505)
-- Name: member_interests member_interests_team_member_id_interest_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interests
    ADD CONSTRAINT member_interests_team_member_id_interest_id_key UNIQUE (team_member_id, interest_id);


--
-- TOC entry 4981 (class 2606 OID 16470)
-- Name: member_skills member_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_skills
    ADD CONSTRAINT member_skills_pkey PRIMARY KEY (member_skill_id);


--
-- TOC entry 4983 (class 2606 OID 16472)
-- Name: member_skills member_skills_team_member_id_skill_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_skills
    ADD CONSTRAINT member_skills_team_member_id_skill_id_key UNIQUE (team_member_id, skill_id);


--
-- TOC entry 5019 (class 2606 OID 16688)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 5001 (class 2606 OID 16583)
-- Name: phases phases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phases
    ADD CONSTRAINT phases_pkey PRIMARY KEY (phase_id);


--
-- TOC entry 5003 (class 2606 OID 16585)
-- Name: phases phases_project_id_phase_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phases
    ADD CONSTRAINT phases_project_id_phase_order_key UNIQUE (project_id, phase_order);


--
-- TOC entry 5016 (class 2606 OID 16660)
-- Name: progress_updates progress_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress_updates
    ADD CONSTRAINT progress_updates_pkey PRIMARY KEY (progress_update_id);


--
-- TOC entry 4995 (class 2606 OID 16534)
-- Name: project_ideas project_ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_ideas
    ADD CONSTRAINT project_ideas_pkey PRIMARY KEY (idea_id);


--
-- TOC entry 4998 (class 2606 OID 16556)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- TOC entry 4976 (class 2606 OID 16456)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);


--
-- TOC entry 4978 (class 2606 OID 16458)
-- Name: skills skills_skill_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_skill_name_key UNIQUE (skill_name);


--
-- TOC entry 5011 (class 2606 OID 16633)
-- Name: task_assignments task_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_pkey PRIMARY KEY (assignment_id);


--
-- TOC entry 5013 (class 2606 OID 16635)
-- Name: task_assignments task_assignments_task_id_team_member_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_task_id_team_member_id_key UNIQUE (task_id, team_member_id);


--
-- TOC entry 5007 (class 2606 OID 16613)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- TOC entry 4972 (class 2606 OID 16435)
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (team_member_id);


--
-- TOC entry 4974 (class 2606 OID 16437)
-- Name: team_members team_members_team_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_user_id_key UNIQUE (team_id, user_id);


--
-- TOC entry 4969 (class 2606 OID 16416)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- TOC entry 4965 (class 2606 OID 16405)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4967 (class 2606 OID 16403)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4988 (class 1259 OID 16701)
-- Name: idx_member_interests_member_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_member_interests_member_id ON public.member_interests USING btree (team_member_id);


--
-- TOC entry 4979 (class 1259 OID 16700)
-- Name: idx_member_skills_member_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_member_skills_member_id ON public.member_skills USING btree (team_member_id);


--
-- TOC entry 5017 (class 1259 OID 16710)
-- Name: idx_notifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_user_id ON public.notifications USING btree (user_id);


--
-- TOC entry 4999 (class 1259 OID 16704)
-- Name: idx_phases_project_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_phases_project_id ON public.phases USING btree (project_id);


--
-- TOC entry 5014 (class 1259 OID 16709)
-- Name: idx_progress_updates_task_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_progress_updates_task_id ON public.progress_updates USING btree (task_id);


--
-- TOC entry 4993 (class 1259 OID 16702)
-- Name: idx_project_ideas_team_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_project_ideas_team_id ON public.project_ideas USING btree (team_id);


--
-- TOC entry 4996 (class 1259 OID 16703)
-- Name: idx_projects_team_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_projects_team_id ON public.projects USING btree (team_id);


--
-- TOC entry 5008 (class 1259 OID 16708)
-- Name: idx_task_assignments_member_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_task_assignments_member_id ON public.task_assignments USING btree (team_member_id);


--
-- TOC entry 5009 (class 1259 OID 16707)
-- Name: idx_task_assignments_task_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_task_assignments_task_id ON public.task_assignments USING btree (task_id);


--
-- TOC entry 5004 (class 1259 OID 16705)
-- Name: idx_tasks_phase_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_phase_id ON public.tasks USING btree (phase_id);


--
-- TOC entry 5005 (class 1259 OID 16706)
-- Name: idx_tasks_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_status ON public.tasks USING btree (status);


--
-- TOC entry 4970 (class 1259 OID 16699)
-- Name: idx_team_members_team_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_team_members_team_id ON public.team_members USING btree (team_id);


--
-- TOC entry 5025 (class 2606 OID 16511)
-- Name: member_interests member_interests_interest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interests
    ADD CONSTRAINT member_interests_interest_id_fkey FOREIGN KEY (interest_id) REFERENCES public.interests(interest_id) ON DELETE CASCADE;


--
-- TOC entry 5026 (class 2606 OID 16506)
-- Name: member_interests member_interests_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_interests
    ADD CONSTRAINT member_interests_team_member_id_fkey FOREIGN KEY (team_member_id) REFERENCES public.team_members(team_member_id) ON DELETE CASCADE;


--
-- TOC entry 5023 (class 2606 OID 16478)
-- Name: member_skills member_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_skills
    ADD CONSTRAINT member_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id) ON DELETE CASCADE;


--
-- TOC entry 5024 (class 2606 OID 16473)
-- Name: member_skills member_skills_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_skills
    ADD CONSTRAINT member_skills_team_member_id_fkey FOREIGN KEY (team_member_id) REFERENCES public.team_members(team_member_id) ON DELETE CASCADE;


--
-- TOC entry 5036 (class 2606 OID 16694)
-- Name: notifications notifications_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id) ON DELETE SET NULL;


--
-- TOC entry 5037 (class 2606 OID 16689)
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5030 (class 2606 OID 16586)
-- Name: phases phases_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phases
    ADD CONSTRAINT phases_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE;


--
-- TOC entry 5034 (class 2606 OID 16661)
-- Name: progress_updates progress_updates_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress_updates
    ADD CONSTRAINT progress_updates_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- TOC entry 5035 (class 2606 OID 16666)
-- Name: progress_updates progress_updates_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress_updates
    ADD CONSTRAINT progress_updates_team_member_id_fkey FOREIGN KEY (team_member_id) REFERENCES public.team_members(team_member_id) ON DELETE SET NULL;


--
-- TOC entry 5027 (class 2606 OID 16535)
-- Name: project_ideas project_ideas_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_ideas
    ADD CONSTRAINT project_ideas_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE;


--
-- TOC entry 5028 (class 2606 OID 16562)
-- Name: projects projects_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.project_ideas(idea_id) ON DELETE SET NULL;


--
-- TOC entry 5029 (class 2606 OID 16557)
-- Name: projects projects_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE;


--
-- TOC entry 5032 (class 2606 OID 16636)
-- Name: task_assignments task_assignments_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- TOC entry 5033 (class 2606 OID 16641)
-- Name: task_assignments task_assignments_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_team_member_id_fkey FOREIGN KEY (team_member_id) REFERENCES public.team_members(team_member_id) ON DELETE CASCADE;


--
-- TOC entry 5031 (class 2606 OID 16614)
-- Name: tasks tasks_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_phase_id_fkey FOREIGN KEY (phase_id) REFERENCES public.phases(phase_id) ON DELETE CASCADE;


--
-- TOC entry 5021 (class 2606 OID 16438)
-- Name: team_members team_members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE;


--
-- TOC entry 5022 (class 2606 OID 16443)
-- Name: team_members team_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5020 (class 2606 OID 16417)
-- Name: teams teams_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE SET NULL;


-- Completed on 2026-08-09 21:48:33

--
-- PostgreSQL database dump complete
--

\unrestrict 0cfMLynD8hu5Ny1UCj1fgKRPM7CCB9jMFwcxQkubYNKBSNNfCwPt4HDVt0Qbk2L

