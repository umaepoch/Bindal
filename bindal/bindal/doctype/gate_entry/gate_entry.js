// Copyright (c) 2022, pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gate Entry', {
	type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	if(d.type == "Inward")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",["Purchase Order","Supplier Invoice","Returnable Gate Pass"]]]
				};
				});
	}
	else if(d.type == " ")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",[" "]]]
				};
				});
	}
	}
	});

frappe.ui.form.on('Gate Entry', {
	type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	if(d.type == "Outward")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",["Delivery Note","Sales Invoice","Returnable Gate Pass","Non-Returnable Gate Pass"]]]
				};
				});
	}
	else if(d.type == " ")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",[" "]]]
				};
				});
	}
	}
	});

frappe.ui.form.on('Gate Entry', {
weighment_required:function(frm,cdt,cdn)
	{
		var d = locals[cdt][cdn];
		if(d.weighment_required == "Yes")
		{
	 	frm.toggle_display("weightment_details_section", true);
    	}
    	else
    	{
    	 frm.toggle_display("weightment_details_section", false);   
    	}
	}
	});
	
frappe.ui.form.on('Gate Entry', {
type:function(frm,cdt,cdn)
	{
		var d = locals[cdt][cdn];
		
		if(d.type == "Inward")
		{
		cur_frm.refresh();
		frm.refresh_field('document_details') 
	    d.document_details = " ";
		frm.toggle_display("other_document_description", true);
		frm.toggle_display("document_details", true);
    frm.toggle_display("other_document_description_outward", false);
    frm.toggle_display("estimated_net_weight", false); 
		}
	    else if(d.type == "Outward")
		{
		cur_frm.refresh();
		frm.refresh_field('document_details')
		console.log("hai");
		frm.toggle_display("other_document_description_outward", true);
		frm.toggle_display("other_document_description", false);
		frm.toggle_display("document_details", true);
   
		}
		else
		{
		console.log("d.type",d.type);
		frm.toggle_display("other_document_description_outward", false);
		frm.toggle_display("other_document_description", false);
		frm.toggle_display("document_details", false);
    frm.toggle_display("estimated_net_weight", false);
		}
    if(d.type == "Outward" && d.supporting_document =="Delivery Note") 
    {
      frm.toggle_display("estimated_net_weight", true); 
    }
	}
});

    frappe.ui.form.on('Gate Entry', {
    record_number: function(frm, cdt, cdn) {
    
    var d = locals[cdt][cdn];
    var record_number = d.record_number;
    if(d.other_document_description == "Supplier Invoice" && d.supporting_document =="Purchase Order")
    {
     var supplier=fetch_supplier(record_number); 
      console.log("supplier",supplier);
      cur_frm.set_value("supplier_name",supplier);
    }
        }});
    function fetch_supplier(record_number) 
    {
        
        console.log("entered into function");
        var sup = "";
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                'doctype': 'Purchase Order',
                'fieldname': 'supplier_name',
    
                 'filters': {
                    name: record_number,
                                }
            },
            async: false,
            callback: function(r) {
                if (r.message) {
                    // console.log(r.qty);
                     sup = r.message.supplier_name;
                   
                    console.log("w",sup);
                    console.log("readings-----------" + JSON.stringify(r.message));
    
                }
            }
        });
        return  sup;
    }
    
    
    frappe.ui.form.on('Gate Entry', {
      other_document_description : function(frm, cdt, cdn) 
      {
      var d = locals[cdt][cdn];
      if(d.other_document_description == "Supplier Invoice" || d.other_document_description == "Returnable Gate Pass")
      {
         frm.toggle_display("supplier_name", true);
        frm.toggle_display("supplier_bill_no", true);
      }
      
      else
      {
        frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
      }
      
      }
      });
    /*
      frappe.ui.form.on('Gate Entry', {
      type : function(frm, cdt, cdn) 
      {
      if(d.type == "Outward")
      {
      frm.toggle_display("supplier_name", false);
      frm.toggle_display("supplier_bill_no", false);  
      }
      }
      });
*/
 
            
    