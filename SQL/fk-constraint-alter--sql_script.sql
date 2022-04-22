ALTER TABLE Post DROP CONSTRAINT FK_Post_Category;

ALTER TABLE Post ALTER COLUMN CategoryId INT NULL;

ALTER TABLE Post
ADD CONSTRAINT fk_cat_id 
FOREIGN KEY (CategoryId)
REFERENCES Category (Id)
ON DELETE SET NULL;
