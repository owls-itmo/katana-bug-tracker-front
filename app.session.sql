-- DROP TABLE course_comment,
--  course_epic,
--  course_event,
--  course_event_issue,
--  course_file,
--  course_issue,
--  course_issue_tag,
--  course_permission_set,
--  course_rating,
--  course_sprint,
--  course_tag,
--  course_user;

CREATE OR REPLACE FUNCTION update_last_modified_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_modified_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_comment_last_modified
BEFORE UPDATE ON course_comment
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_at();


