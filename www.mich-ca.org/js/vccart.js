function addToShoppingCartWithQty(id, recNum){
	var oForm = document.forms['pageForm'];
	var qty = 0;
	if(recNum != undefined && recNum >= 0){
		qty = oForm.elements["qty"][recNum].value;
	}else{
		qty = oForm.elements["qty"].value;
	}
	
	if(qty != undefined){
		qty = qty; 
	}else{
		qty = 1
	}
	qty = (qty === undefined) ? 1 : qty; 
	var link = "shoppingcart.htm?id="+id+"&qty="+qty;
	oForm.action = link;
	oForm.submit();
}

function selectAllCheckBox(elementId, checkboxDataId) {
    if (document.getElementById(elementId).checked == true) {
        $(checkboxDataId).each(function() {
            this.checked = true;
        });
    } else {
        $(checkboxDataId).each(function() {
            this.checked = false;
        });
    }
}