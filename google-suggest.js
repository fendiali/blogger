/*! suppersuggest.js 1.0
 *
 * Written by John Thomas @hashtagJohnT
 * Copyright (c) 2015 John Thomas
 * Available under the MIT license
 */
  
  // Global varaibles are "EVIL", so this is a way to get around it.
  var SuggestGlobal = (function() {
    var gKeyword = "";
    var callbackNum = 0;
    var gResults = new Array();

    // // Variables used to store user settings.
    // var inputMapping = {};

    // This is used to convert user input text to html safe text for classes and id's.
    function makeSafeForCSS(name) {
      return name.replace(/[^a-z0-9]/g, function(s) {
          var c = s.charCodeAt(0);
          if (c == 32) return '-';
          if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
          return '__' + ('000' + c.toString(16)).slice(-4);
      });
    }

    function setKeyword(keyword) {
      gKeyword = keyword;
    }

    function getKeyword() {
      return gKeyword;
    }

    function generateKeywordArr(skeyword) {
      //Add whitespace to keyword
      var kWordWithSpace = skeyword + '%20';
      //Define the output array.
      var skeywords = new Array(skeyword, kWordWithSpace);
      //Create an array with all the characters to append.
      var additionalChars = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

      //Create array of Keywords.
      for (var i=0; i<additionalChars.length; i++) {
          skeywords.push(kWordWithSpace + additionalChars[i]);
      }

      return skeywords;
    }

    function setCallbackCount(length) {
      callbackNum = length;
    }

    function changeCallbackCount(num) {
      callbackNum += num;
    }

    function getCallbackCount() {
      return callbackNum;
    }

    function getSuggestions(sKeywords, lang) {
      //Loop through keywords. This will populate the gResults global variable (array).
      for (var i=0; i < sKeywords.length; i++) {
          initializeSuggestCall(sKeywords[i], lang);
      }
    }

    function initializeSuggestCall(cKeyword, lang) {
      //Set the default language
      lang = (typeof lang === "undefined") ? "en" : lang;
      
      //Create the script component that will get the JSONP response from Google's suggestor
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'script_' + cKeyword;
      script.src = 'http://suggestqueries.google.com/complete/search?client=youtube&jsonp=SuggestGlobal.suggestCallback&q=' + cKeyword + '&hl=' + lang;
      
      //Append the script to the header on the HTML
      document.getElementsByTagName('head')[0].appendChild(script);

      //Delete the added script to clean up the HTML (requires common.js or a version of that).
      script.remove();
    }

    function pushGResult(result) {
      gResults.push(result);
    }

    function getGResults() {
      return gResults;
    }

    function checkGStatus() {
      callbackNum -= 1
      if (callbackNum < 1) {
        //Show the results to the client.
        showGResults();
      }

    }

    function privateCallback(dataWeGotViaJSONP) {
      //dataWeGotViaJSONP is an array (0 is name 1 is stuff we care about 2 is the search query object)
      //Get the results from the JSONP response
      var rawResults = dataWeGotViaJSONP[1];
      //The results contain some info we don't care about (namely 0's). This filters them out.
      var resultsWeCareAbout = new Array();
      for (var i=0; i<rawResults.length; i++) {
        gResults.push(rawResults[i][0]);
        // window.gResults.push(rawResults[i][0]);
      }

      checkGStatus();

    }

    function showGResults() {
      // Process results.
      $('#ss-tag-gen-btn').prop('disabled', false);

      $('.keyword span').removeClass('progress-bar');
      // $('#input').val('');
      document.getElementById('ss-results-msg').innerHTML = "<strong>" + gResults.length.toString() + " keywords found for keyword '" + gKeyword + "'</strong>";


      // //Resize the div to hold all of the results.
      // resizeBody('suggestor', 'auto');

      //Show the results in the DOM (one per line).
      document.getElementById('ss-results-body').innerHTML = gResults.join("<br>");
      
      resetSuggestor();
    }

    function resetSuggestor() {
      gKeyword = "";
      callbackNum = 0;
      gResults = new Array();
    }

    /// PUBLIC METHODS
    return {
      htmlSanitize: function(name) {
        return makeSafeForCSS(name);
      },
      setKeywordVariable: function(keyword) {
        return setKeyword(keyword);
      },
      getKeywordVariable: function() {
        return getKeyword();
      },
      generateKeywords: function(seed) {
        return generateKeywordArr(seed);
      },
      setCallbackNumer: function(int) {
        return setCallbackCount(int);
      },
      editCallbackNumber: function(num) {
        return changeCallbackCount(num);
      },
      getCallbackNumer: function(int) {
        return getCallbackCount();
      },
      getSuggestionsFromG: function(sKeywords, lang) {
        return getSuggestions(sKeywords, lang);
      },
      pushResults: function (result) {
        return pushGResult(result);
      },
      getResults: function(){
        return getGResults();
      },
      checkStatus: function() {
        return checkGStatus();
      },
      suggestCallback: function(dataJSONP) {
        return privateCallback(dataJSONP);
      }

    };
  })();

  // This hides the javascript Flash message instead of destroying the DOM object.
  // This is useful for asynchronous calls that might produce multipule errors.
  // without a page reload.
  $('.close').click(function() {
    $('.jsFlash').addClass('hide');
    return false;
  });


  $('#suggest-form').submit(function(event) {
    event.preventDefault();

    // Get input from user
    var inputToSend = $('#input').val();
    // Get the lanuage passed by user.
    var lang = document.getElementById('language').value;

    // Return if no user input.
    if (inputToSend == "") {
      return false;
    }

    // Clear user input and previous results
    $('#input').val('');
    //Show the results in the DOM (one per line).
    document.getElementById('ss-results-body').innerHTML = "";

    // Disable button to keep user from submitting twice.
    $('#ss-tag-gen-btn').prop('disabled', true);

    // Clean keyword text to be used in HTML.
    // var keyword_html = KeywordGlobal.clean_keyword(keyword_lower);
    var htmlInput = SuggestGlobal.htmlSanitize(inputToSend);

    // Create keyword bubble.
    var newKeyword = '<div class="keyword progress progress-striped active" ><span id="' + htmlInput +'" type="text" class="form-control progress-bar" style="border-radius: 20px; width: auto; height: auto;">' + inputToSend + '</span></div>';

    // <i class="glyphicon glyphicon-remove keywordRemoveIcon"></i>

    // // Clear keyword input value.
    // $('#input').val('');

    // Add keyword bubble to container.
    $('#keywordContainer').append(newKeyword);

    //Set the global keyword variable
    SuggestGlobal.setKeywordVariable(inputToSend);

    //Generate array of new Keywords (ABC method).
    var sKeywords = SuggestGlobal.generateKeywords(inputToSend);

    //Create a variable that keeps track of how many callbacks we have left before we are done.
    SuggestGlobal.setCallbackNumer(sKeywords.length);

    //This actually starts the process of getting the suggestions
    SuggestGlobal.getSuggestionsFromG(sKeywords, lang);

    return true;
    
  });
