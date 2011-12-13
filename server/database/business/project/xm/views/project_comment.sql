﻿-- ProjectComment model view
-- xTuple 4.0 project
-- Mikhail Wall

SELECT dropIfExists('VIEW', 'project_comment', 'xm');

-- return rule

CREATE OR REPLACE VIEW xm.project_comment AS

SELECT 	comment_id		AS id,
	comment_source_id	AS project,
	comment_date		AS "date",
	comment_user		AS "user",
	comment_cmnttype_id	AS comment_type,
	comment_text		AS "text",
	comment_public		AS is_public,
	cmnttype_editable	AS can_update
  FROM 	"comment"
  JOIN	cmnttype ON (comment_cmnttype_id = cmnttype_id)
 WHERE 	(comment_source = 'J');

-- insert rule

CREATE OR REPLACE RULE "_CREATE" AS ON INSERT TO xm.project_comment
  DO INSTEAD

INSERT INTO "comment" (
  comment_id,
  comment_source_id,
  comment_source,
  comment_date,
  comment_user,
  comment_cmnttype_id,
  comment_text,
  comment_public)
VALUES (
  new.id,
  new.project,
  'J',
  new.date,
  new.user,
  new.comment_type,
  new.text,
  new.is_public);

-- update rule

CREATE OR REPLACE RULE "_UPDATE" AS ON UPDATE TO xm.project_comment
  DO INSTEAD

UPDATE 	"comment"
   SET 	comment_text 	= new.text,
	comment_public	= new.is_public
 WHERE 	(comment_id	= old.id);

-- delete rule
CREATE OR REPLACE RULE "_DELETE" AS ON DELETE TO xm.project_comment
  DO INSTEAD NOTHING;