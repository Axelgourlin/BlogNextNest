-- Table: public.admin

-- DROP TABLE public.admin;

CREATE TABLE IF NOT EXISTS public.admin
(
    admin_id integer NOT NULL,
    admin_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (admin_id)
)

TABLESPACE pg_default;

ALTER TABLE public.admin
    OWNER to postgres;

-- Table: public.article

-- DROP TABLE public.article;

CREATE TABLE IF NOT EXISTS public.article
(
    id integer NOT NULL DEFAULT nextval('article_id_seq'::regclass),
    article_title character varying COLLATE pg_catalog."default" NOT NULL,
    article_text character varying COLLATE pg_catalog."default",
    article_bg_img character varying COLLATE pg_catalog."default",
    article_min_img character varying COLLATE pg_catalog."default",
    "article_createdAt" character varying COLLATE pg_catalog."default",
    category_id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT article_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.article
    OWNER to postgres;

-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE IF NOT EXISTS public.category
(
    id integer NOT NULL,
    category_name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT category_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;