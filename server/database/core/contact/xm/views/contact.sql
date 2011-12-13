select dropIfExists('VIEW', 'contact', 'xm');

-- return rule

create or replace view xm.contact as 

select
  cntct_id as id,
  cntct_number as number,
  cntct_active as is_active,
  cntct_honorific as honorific,
  cntct_first_name as first_name,
  cntct_middle as middle_name,
  cntct_last_name as last_name,
  cntct_suffix as suffix,
  cntct_title as job_title,
  cntct_initials as initials,
  cntct_phone as phone,
  cntct_phone2 as alternate,
  cntct_fax as fax,
  cntct_email as primary_email,
  cntct_webaddr as web_address,
  cntct_crmacct_id as account,
  cntct_owner_username as owner,
  cntct_notes as notes,
  cntct_addr_id as address,
  rtrim(ltrim(array(
    select cntcteml_id 
    from cntcteml
    where cntcteml_cntct_id = cntct_id )::text,'{'),'}') as email,
  rtrim(ltrim(array(
    select comment_id 
    from comment
    where comment_source_id = cntct_id 
      and comment_source = 'T')::text,'{'),'}') as comments,
  rtrim(ltrim(array(
    select charass_id 
    from charass
    where charass_target_id = cntct_id 
      and charass_target_type = 'CNTCT')::text,'{'),'}') as characteristics,
  rtrim(ltrim(array(
    select docass_id 
    from docass
    where docass_target_id = cntct_id 
      and docass_target_type = 'T'
    union all
    select docass_id 
    from docass
    where docass_source_id = cntct_id 
      and docass_source_type = 'T'
    union all
    select imageass_id 
    from imageass
    where imageass_source_id = cntct_id 
      and imageass_source = 'T')::text,'{'),'}') as documents
from cntct;

-- insert rule

create or replace rule "_CREATE" as on insert to xm.contact 
  do instead

insert into cntct (
  cntct_id,
  cntct_number,
  cntct_active,
  cntct_honorific,
  cntct_first_name,
  cntct_middle,
  cntct_last_name,
  cntct_suffix,
  cntct_title,
  cntct_initials,
  cntct_phone,
  cntct_phone2,
  cntct_fax,
  cntct_email,
  cntct_webaddr,
  cntct_notes,
  cntct_crmacct_id,
  cntct_owner_username,
  cntct_addr_id )
values (
  new.id,
  new.number,
  new.is_active,
  new.honorific,
  new.first_name,
  new.middle_name,
  new.last_name,
  new.suffix,
  new.job_title,
  new.initials,
  new.phone,
  new.alternate,
  new.fax,
  new.primary_email,
  new.web_address,
  new.notes,
  new.account,
  new.owner,
  new.address );

-- update rule

create or replace rule "_UPDATE" as on update to xm.contact 
  do instead

update cntct set
  cntct_number = new.number,
  cntct_active = new.is_active,
  cntct_honorific = new.honorific,
  cntct_first_name = new.first_name,
  cntct_middle = new.middle_name,
  cntct_last_name = new.last_name,
  cntct_suffix = new.suffix,
  cntct_title = new.job_title,
  cntct_initials = new.initials,
  cntct_phone = new.phone,
  cntct_phone2 = new.alternate,
  cntct_fax = new.fax,
  cntct_email = new.email,
  cntct_webaddr = new.web_address,
  cntct_notes = new.notes,
  cntct_crmacct_id = new.account,
  cntct_owner_username = new.owner,
  cntct_addr_id = new.address
where ( cntct_id = old.id );

-- delete rules

create or replace rule "_DELETE" as on delete to xm.contact 
  do instead (

delete from comment 
where ( comment_source_id = old.id ) 
 and ( comment_source = 'T' );

delete from charass
where ( charass_target_id = old.id ) 
 and ( charass_target_type = 'CNTCT' );

delete from docass
where ( docass_target_id = old.id ) 
 and ( docass_target_type = 'T' );

delete from docass
where ( docass_source_id = old.id ) 
 and ( docass_source_type = 'T' );

delete from imageass
where ( imageass_source_id = old.id ) 
 and ( imageass_source = 'T' );

delete from cntct
where ( cntct_id = old.id );

)