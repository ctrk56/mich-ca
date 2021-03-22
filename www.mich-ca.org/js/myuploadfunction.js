$(function () {
	
    $("#clearUploadImages").click(function(request, response){
    	$.ajax({
            url: 'clearLoadedImages.htm',
            data: {
                term: request.term,
                extraParam: 'foo'
            },
            success: function (data) {
            	$("#successDiv").text(data);            	 
            }
        });
    });
    
    $('#fileupload').fileupload({
    	maxRetries: 100,
        retryTimeout: 500,
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progress .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });
    
    $('#fileuploadZip').fileupload({
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progressZip .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });

	$('#fileuploadEin').fileupload({
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progressEin .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });
	
	$('#fileuploadTaxRate').fileupload({
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progressTaxRate .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });
	
	$('#xcelProfilesUpload').fileupload({
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progressXcelProfileUpload .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });
	
	$('#fileuploadUploadDocs').fileupload({
        dataType: 'json',
        success: function (response) {
        	$("#successDiv").html(getSuccessMsgFromArray(response));
        	$("#errorDiv").html(getErrorMsgFromArray(response));
        },
       
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progressDocumentUpload .bar').css(
	            'width',
	            progress + '%'
	        );
   		}
    });
	
	$("#clearUploadDocuments").click(function(request, response){
    	$.ajax({
            url: 'clearLoadedDocs.htm',
            data: {
                term: request.term,
                extraParam: 'foo'
            },
            success: function (data) {
            	$("#successDiv").text(data);            	 
            }
        });
    });

    function getSuccessMsgFromArray(response) {
    	if(response != null && response.status === "success"){
    		clearAllMessageDivs();
    		var successInfo = "Success:";
    		successInfo += "<ul>";
    		for(var i=0;i<response.result.length;i++){
    			successInfo += "<li>" + response.result[i]+"</li>";
            }
    		successInfo += "</ul>";
    		return successInfo;
    	}
    }
    
    function getErrorMsgFromArray(response) {
    	if (response != null && response.status === "failure"){
    		clearAllMessageDivs();
    		var errorInfo = "Error:";
    		errorInfo += "<ul>";
    		for(var i=0;i<response.result.length;i++){
                errorInfo += "<li>" + response.result[i]+"</li>";
            }
    		errorInfo += "</ul>";
    		return errorInfo;
    	}
    }

    function clearAllMessageDivs(){
    	$("#successDiv").html("");
			$("#errorDiv").html("");
    }
    
    $('#articleToArticle_articleTypeId').change(function(request, response) {
    	var articleTypeId = $("select#articleToArticle_articleTypeId").val();
    	$.ajax({
    		dataType: 'json',
    		url: 'getArticleByType.htm',
    		data: {
    			term: request.term,
    			extraParam: 'foo',
    			articleTypeId: articleTypeId
    		},
    		success: function (response) {
    			var addSubArticleFrame = $('#addSubArticleFrame');
    			addSubArticleFrame.empty();
    			$.each(response.result, function (i, val) {
    				$.each(val, function(key, value) {
    					$('<input />', { type: 'checkbox', name:'articleToArticle.articleToIds', id: 'articleToArticle_articleToIds'+key, value: key }).appendTo(addSubArticleFrame);
    					$('<label />', { 'for': 'articleToArticle_articleToIds'+key, text: value }).appendTo(addSubArticleFrame);
    					addSubArticleFrame.append("<br>");
    				});
    			});
    		}
    	});
	});
    
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }
 
    $( "#city" ).autocomplete({	
      source: function( request, response ) {
        $.ajax({
          url: "getArticleByType.htm",
          dataType: "json",
          data: {
  			term: request.term,
  			extraParam: 'foo',
  			articleTypeId: $("select#articleToArticle_articleTypeId").val()
  		  },
          success: function( data ) {
        	  var res = [] ;
        	  $.each(data.result, function (i, val) {
  				$.each(val, function(key, value) {
  					var  mp = {};
  					mp['label'] = value;
  					mp['value'] = key;
  					res.push(mp);
  				});
  			  });
        	  response( res );
          }
        });
      },
      minLength: 3,
      select: function( event, ui ) {
        log( ui.item ?
          "Selected: " + ui.item.value :
          "Nothing selected, input was " + this.value);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    
});