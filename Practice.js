var userCount = 0;
var addUser;
var searchUser;
var chkUnique;
var showAge;
var countUsers;
var refreshStats;
var calDOB;
var appendUser;
var sortUsers;
var ageIsValid;
var loadUserData;


$(document).ready(function() {

  $("#searchResults").hide();
  $("#removeUser").hide();

  ageIsValid=function(age){

  	if(age<18 || age>60)
  		return false;

  	return true;
  }

  setAge = function(dob) {
    dob = new Date(dob.value).getTime();
    dob = new Date().getTime() - dob;
    dob = dob / (1000 * 60 * 60 * 24 * 365);
    dob = Math.round(dob);
    $("#age").val(dob);
    showAge(dob, $("#agehere"));
  };


  $(".dobAge,#DOB").hover(function() {
      $(".dobAge").css("color", "red");
    },
    function() {
      $(".dobAge").css("color", "black");
    });



  refreshStats = function() {

    let male, female, other;

    male = female = other = 0;

    let fromAge = $("#fromAge").val();
    let toAge = $("#toAge").val();
    let tAge = 0;

    $("#tableBody tr").each(function(index, element) {

      element = $(element); //convert DOM to jQuery element

      if (element.children("td").eq(2).text() == "male")
        male++;
      else if (element.children("td").eq(2).text() == "female")
        female++;
      else
        other++;

      if (fromAge <= element.children("td").eq(7).text() && element.children("td").eq(7).text() <= toAge)
        tAge++;

    });

    $("#allUsers").html("<b>" + userCount + "</b>");
    $("#males").html("<b>" + male + "</b>");
    $("#females").html("<b>" + female + "</b>");
    $("#others").html("<b>" + other + "</b>");

    if (fromAge > toAge)
      tAge = "N/A";

    $("#fromToAge").html("There are <b>" + tAge + "</b> users between age <b style='color:red'>" + fromAge + "</b> to <b style='color:red'>" + toAge + "</b>");

  }

  countUsers = function() {
    $("#tableBody tr").each(function(index, element) {
      userCount++;
    });

    $("#UserCount").html("(Number of Users : <b>" + userCount + "</b>)");
  }

  countUsers();

  refreshStats();

  $("#clearSearchResults").click(function() {
    $("#removeUser").hide();
    $("#searchResults").hide("slow");
  });

  $("#removeUser").click(function() {
    let user = $("#emailToSearch").val();
    let flag = false;
    $("#tableBody tr").each(function(index, element) {

      element = $(element);
      if (flag) {
        let tmp = parseInt(element.children("td").eq(0).text()) - 1;
        element.children("td").eq(0).text(tmp);
      }
      if (element.children("td").eq(3).text() == user) {
        element.remove();
        userCount--;
        alert("User entry was removed !");
        $("#UserCount").html("(Number of Users : <b>" + userCount + "</b>)");
        flag = true;
      }
    });
    $("#clearSearchResults").click();
    $("#searchResults").hide("slow");
    $("#userSearchForm").get(0).reset(); //reset the search form
    refreshStats();
  });

  showAge = function(val, where) {
    where = $(where); //convert html dom to jQuery Element
    where.text(val);

  }

  searchUser = function() {
    let user = $("#emailToSearch").val();
    let flag = false;

    $("#tableBody tr").each(function(index, element) {
      element = $(element);
      if (element.children("td").eq(3).text() == user) {
        $("#searchResults h5").text("Search Results :");
        $("#searchName").html("<b>Name: </b>" + element.children("td").eq(1).text());
        $("#searchSex").html("<b>Sex: </b>" + element.children("td").eq(2).text());
        $("#searchEmail").html("<b>Email: </b>" + element.children("td").eq(3).text());
        $("#searchDob").html("<b>DOB: </b>" + element.children("td").eq(4).text());
        $("#searchBloodGroup").html("<b>Blood Group: </b>" + element.children("td").eq(5).text());
        $("#searchHobbies").html("<b>Hobbies: </b>" + element.children("td").eq(6).text());
        $("#searchAge").html("<b>Age: </b>" + element.children("td").eq(7).text());
        $("#searchPassword").html("<b>Decrypted Password: </b>" + Decrypt_Driver(element.children("td").eq(8).text()));
        $("#searchResults").show("slow");
        $("#removeUser").show();
        flag = true;
        return false; // to break from each                                       
      }
    });

    if (!flag)
      alert("The user with the specified email was not found !");

    return false;

  }


  chkUnique = function(user) {
    let flag = true;
    $("#tableBody tr").each(function(index, element) {
      element = $(element);
      if (element.children("td").eq(3).text() == user) {
        flag = false;
        return false; // to break from each                                       
      }

    });
    if (!flag)
      return false;

    return true;
  }


  addUser = function() {

    if (!chkUnique($("#email").val())) {
      alert("This Email is already registered !")
      return false;
    }


    let name = $("#username").val();
    let sex = $("input[name=sex]:checked").val();
    let email = $("#email").val();
    let dob = $("#DOB").val();
    let bloodgroup = $("#BloodGroup").val();
    let hobbies = $("#hobbies").val();
    let age = $("#age").val();
    let password = $("#password").val();

    if(!ageIsValid(age)){
    	alert("Only users between age 18 to 60 are allowed");
    	return false;
    }

    password = Encrypt_Driver(password);



    appendUser(name, sex, email, dob, bloodgroup, hobbies, age, password);
    refreshStats();

    $("#userTableReset").click();

    return false;
  }


  appendUser = function(name, sex, email, dob, bloodgroup, hobbies, age, password) {
    let row = $("<tr></tr>");
    let slCell = $("<td></td>");
    let nameCell = $("<td></td>");
    let sexCell = $("<td></td>");
    let emailCell = $("<td colspan='2'></td>");
    let dobCell = $("<td></td>");
    let bloodgroupCell = $("<td></td>");
    let hobbiesCell = $("<td></td>");
    let ageCell = $("<td></td>");
    let passwordCell = $("<td></td>");

    slCell.text(++userCount);
    nameCell.text(name);
    sexCell.text(sex);
    emailCell.text(email);
    dobCell.text(dob);
    bloodgroupCell.text(bloodgroup);
    hobbiesCell.text(hobbies);
    ageCell.text(age);
    passwordCell.text(password);

    row.append(slCell, nameCell, sexCell, emailCell, dobCell, bloodgroupCell, hobbiesCell, ageCell, passwordCell);
    $("#tableBody").append(row);
    $("#UserCount").html("(Number of Users : <b>" + userCount + "</b>)");

  }

  class User {

    constructor(userName, sex, email, dob, bloodgroup, hobbies, age, password) {
      this.userName = userName;
      this.sex = sex;
      this.email = email;
      this.dob = dob;
      this.bloodgroup = bloodgroup;
      this.hobbies = hobbies;
      this.age = age;
      this.password = password;
    }

  }

  sortUsers = function() {

    let userArr = [];

    $("#tableBody tr").each(function(index, element) {
      element = $(element);
      let ob = new User(
        element.children("td").eq(1).text(),
        element.children("td").eq(2).text(),
        element.children("td").eq(3).text(),
        element.children("td").eq(4).text(),
        element.children("td").eq(5).text(),
        element.children("td").eq(6).text(),
        element.children("td").eq(7).text(),
        element.children("td").eq(8).text());

      userArr.push(ob);

    });

    let compareFunction = $("#sortBy").val() == "age" ? (a, b) => (a.age - b.age) : (a, b) => a.userName.localeCompare(b.userName);

    userArr.sort(compareFunction);

    if ($("#sortOrder").val() == "desc")
      userArr.reverse(compareFunction); // reverse() the sorted array

    $("#tableBody").empty(); // removes all rows in table body

    let sl = 1;

    userCount = 0;

    for (user of userArr)
      appendUser(user.userName, user.sex, user.email, user.dob, user.bloodgroup, user.hobbies, user.age, user.password);

  };

  loadUserData=function(){

  	// Javascript automatically parses UserData.json no need to do JSON.parse(data) manually

  	let name,sex,email,dob,bloodGroup,hobbies,age,password;


    for(user of data){

  	  name = user.name;
      sex = user.sex;
      email = user.email;
      dob = user.dob;
      bloodGroup = user.bloodGroup;
      hobbies = user.hobbies;
      age = user.age;
      password = user.password;
      password = Encrypt_Driver(password);

      appendUser(name, sex, email, dob, bloodGroup, hobbies, age, password);
	}	

	refreshStats();
  }

  loadUserData();

  console.log("called1");
  $("#my-form").submit(function(e){
    event.preventDefault();
    addUser();
  });

});
