 $(document).ready(function () {
    
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    /* ------------------------ DATEPICKER CALENDER--------------------------*/
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    $(function () {
        var dateFormat = "mm.dd.yy"
            , from = $("#from").datepicker({
                defaultDate: "+1w"
                , changeMonth: true
                , numberOfMonths: 2
                , minDate: 0
                , dateFormat: "DD dd.mm.y"
                , showAnim: "slide"
                , duration: 1500
            }).on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            });
        var to = $("#to").datepicker({
            defaultDate: "+1w"
            , changeMonth: true
            , numberOfMonths: 2
            , minDate: +2
            , dateFormat: "DD dd.mm.y"
            , showAnim: "slide"
            , duration: 1500
        }).on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            }
            catch (error) {
                date = null;
            }
            return date;
        }
    });
   
    
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    /* -------------------------- MENU LOAD AND SHOW ------------------------*/
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    $('#menu li:eq(0)').click(function () {
        $('#view').slideUp("400", function () {
            $('#view').load('/aboutUs.html', function () {
                $('#view').slideDown(800);
            });
        });
    });
    $('#menu li:eq(1)').click(function () {
        $('#view').slideUp("400", function () {
            $('#view').load('/rooms.html', function () {
                $('#view').slideDown(800);
            });
        });
    });
    $('#menu li:eq(2)').click(function () {
        $('#view').slideUp("400", function () {
            $('#view').load('/ourVillage.html', function () {
                $('#view').slideDown(800);
            });
        });
    });
    $('#menu li:eq(3)').click(function () {
        $('#view').slideUp("400", function () {
            $('#view').load('/map.html', function () {
                $('#view').slideDown(800);
            });
        });
    });
    $('#menu li:eq(5)').click(function () {
        $('#view').slideUp("400", function () {
            $('#view').load('/reviews.html', function () {
                $('#view').slideDown(800);
            });
        });
    });
     

     
    $('#view .fa-times-circle').click(function () {
        $('#view').fadeOut(300);
    });
     
     
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    /* -------------------------- PHOTO GALLERY -----------------------------*/
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    $(".smlImg img").click(function () {
        var oldImg = $("#frontImg").attr("src");
        var newImg = $(this).attr("src").replace("/images/small", "/images");
        $("#backImg").attr({
            "src": oldImg
        });
        $("#frontImg").hide();
        $("#frontImg").attr({
            "src": newImg
        });
        $("#frontImg").fadeIn(800);
    });
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    /* -------------------------- FORM VALIDATION ------not finished---------*/
    /* ----------------------------------------------------------------------*/
    /* ----------------------------------------------------------------------*/
    
    
    function checkForm() {
        var str = "";
        var nameReg = /^[A-Za-z]+$/;
        var numberReg = /^[0-9]+$/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        /**********************/
        /*     CHECK NAME     */
        /**********************/
        var fName = document.forms["contact_form"]["fName"].value;
        if (fName == "") {
            str += "First name must be filled<br>";
        }
        else if (fName.length < 2) {
            str += "First name is too short<br>";
        }
        else if (!nameReg.test(fName)) {
            str += "First name is wrong<br>";
        };
        
        /****************************/
        /*    CHECK EMAIL ADDRESS   */
        /****************************/
        var email = document.forms["contact_form"]["email"].value;
        if (email == "") {
            str += "Email address must be filled<br>";
        }
        else if (!emailReg.test(email)) {
            str += "wrong e-mail address<br>";
        };
        /****************************/
        /*    CHECK PHONE NUMBER    */
        /****************************/
        var phone = document.forms["contact_form"]["phone"].value;
        if (phone == "") {
            str += "Phone number must be filled<br>";
        }
        else if (!numberReg.test(phone)) {
            str += "phone contain illegal digits<br>";
        }
        else if ((phone.length < 9 || phone.length > 11)) {
            str += "phone contain wrong number of digits<br>";
        };
        /****************************/
        /*    CHECK COMMENT    */
        /****************************/
        var comment = document.forms["contact_form"]["comment"].value;
        if (comment == "") {
            str += "Please write your Comment<br>";
        };
         
        /*********************************/
        /*    CHECK IF ANY WRONG FIELD   */
        /*********************************/
        if (str != "") {
            document.getElementById("error_box").style.display = "block";
            document.getElementById("error_content").innerHTML = str;
            return false;
        }
    }

   
});