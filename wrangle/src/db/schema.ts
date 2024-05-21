import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projectsSchema = sqliteTable("projects", {
  id: integer("id").primaryKey().unique(),
  name: text("name").notNull(),
  wikiType: text("wiki_type", { enum: ["MARKDOWN", "WEB"] }),
  wikiURL: text("wiki_url"),
  wikiFilepath: text("wiki_filepath"),
});

export const projectsRelations = relations(projectsSchema, ({ many }) => ({
  projectsToTags: many(projectsToTagsSchema),
}));

export const tagsSchema = sqliteTable("project_tags", {
  color: text("color", { length: 6 }),
  description: text("description"),
  id: integer("id").primaryKey().unique(),
  name: text("name").notNull(),
});

export const tagsRelations = relations(tagsSchema, ({ many }) => ({
  projectsToTags: many(projectsToTagsSchema),
}));

export const projectsToTagsSchema = sqliteTable("projects_tags", {
  id: integer("id").primaryKey().unique(),
  projectID: integer("project_id")
    .notNull()
    .references(() => projectsSchema.id),
  tagID: integer("project_tag_id")
    .notNull()
    .references(() => tagsSchema.id),
});

export const projectsToTagsRelations = relations(
  projectsToTagsSchema,
  ({ one }) => ({
    project: one(projectsSchema, {
      fields: [projectsToTagsSchema.projectID],
      references: [projectsSchema.id],
    }),
    tags: one(tagsSchema, {
      fields: [projectsToTagsSchema.tagID],
      references: [tagsSchema.id],
    }),
  })
);

export const viewsSchema = sqliteTable("views", {
  id: integer("id").primaryKey().unique(),
  name: text("name").notNull(),
  filepath: text("filepath"),
  iconURI: text("iconURI"),
  color: text("color", { length: 6 }).default("000000").notNull(),
});
