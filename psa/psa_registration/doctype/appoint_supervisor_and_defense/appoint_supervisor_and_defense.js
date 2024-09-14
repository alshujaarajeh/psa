// Copyright (c) 2024, Sana'a university and contributors
// For license information, please see license.txt

frappe.ui.form.on("Appoint Supervisor and Defense",  {
  onload(frm){
       // Fetch data from the Doctype
       frappe.call({
        method: "frappe.client.get_list",
        args: {
          doctype: "Student",
          fields: ["name"],
          filters: {
              user_id:frappe.session.user_email
          }
        },
        callback: function(r) {
          frm.set_value('student', r.message[0].name);
          
          frappe.call({
              method: "frappe.client.get_list",
              args: {
                doctype: "Program Enrollment",
                fields: ["program"],
                filters: {
                  student:r.message[0].name,
                  status:"Continued"
                }
              },
              callback: function(s) {
          frm.set_value('program_enrollment', s.message[0].program);
                
        
              }
            });
            frappe.call({
              method: "frappe.client.get_list",
              args: {
                doctype: "Student Supervisor",
                fields: ["supervisor_name"],
                filters: {
                  student:r.message[0].name,
                  status:"Active"
                }
              },
              callback: function(s) {
          frm.set_value('supervisor', s.message[0].supervisor_name);
                
        
              }
            });
            frappe.call({
              method: "frappe.client.get_list",
              args: {
                doctype: "Student Research",
                fields: ["research_title_arabic","research_title_english"],
                filters: {
                  student:r.message[0].name,
                  status:"Active"
                }
              },
              callback: function(s) {
                frm.set_value('research_title_english', s.message[0].research_title_english);
                frm.set_value('research_title_arabic', s.message[0].research_title_arabic);
        
              }
            });
        }
      });
  }
  
 
   });
  
 