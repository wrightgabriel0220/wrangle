# Wrangle
 Cross-platform, Tauri-based PPMA (Personal Project Management Aggregation) desktop client. Aggregates your abstract projects across multiple project management systems, giving you a bird's eye view of your personal workload with full context.

![GitHub License](https://img.shields.io/github/license/wrightgabriel0220/homiehub-homelab)

## Getting Started
There's only two main top-level concepts you need to understand to get started with Wrangle: **Projects** and **Views**

### Projects
Projects represent projects being managed inside of a project manager. Each project has an associated "dashboard" and "wiki". Wrangle can generate a VERY basic dashboard in the absence of a hosted one for any project, but can also just point to an external dashboard. The wiki for any project is optional, and Wrangle doesn't support wiki editing. Rather, Wrangle embeds either a markdown wiki or a wiki hosted elsewhere if you have one available. Projects can be organized using tags. Wrangle tracks all your tags used across your projects so you don't have to manage your own controlled vocabulary.

### Views
Views are selections of project tags you'd like to be able to quickly view. As an example, you may have applied tags for topics certain projects may be associated with (Social, Food, Home, Job Search, etc...) and you may want a view that groups some of those or excludes specific ones.

### Initial Setup
With these concepts in hand, once you open the Wrangle client on your desktop, you can get started by using the button at the top right to add a project for each external project you'd like to subscribe Wrangle to. As you add projects, it's recommended to use tags to organize them. Here's [a great guide on using tags effectively](https://karl-voit.at/2022/01/29/How-to-Use-Tags/) if you're unsure about some good rules of thumb to start:

## License
[The Unlicense](https://github.com/wrightgabriel0220/wrangle/UNLICENSE.txt)