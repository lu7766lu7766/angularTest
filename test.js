$(document).ready(function () {
	$("#name").css({
		"position": "relative",
		"color": "red",
		"top": "10"
	});
});
////////////////////////////////////////////

////////////////////////////////////////////


////////////////////////////////////////////
///////////////////////////////////////////
app.controller("firstTool", function ($scope, $http,fileReader) {
	$scope.edit = false;
	$scope.name = "Anna";
	$scope.enter = function () {
		$scope.edit = false;

	};
	$scope.editing = function () {
		$scope.edit = true;
		//$(".modify_panel").show().find("#edit_name").show().focus();
	};
	$scope.action = function (id) {
		var people, x;
		for (x in self.school) {
			if (self.school[x].id == id) {
				people = self.school[x];
			}
		}
		$scope.edit = true;
		$scope.edit_id = id;
		$scope.edit_name = people.name;
		$scope.edit_age = people.age;
		$scope.edit_weight = people.weight;
		$scope.edit_sex = people.sex;

		if (people.interest == "all") {
			$scope.check_all = true;
			for (var x in self.interest_list) {
				self.interest_list[x].checked = $scope.check_all;
			}
		} else {
			var tmp_arr = people.interest.split(",");
			for (x in self.interest_list) {
				self.interest_list[x].checked = false;
				self.interest_list[x].checked = in_array(tmp_arr, self.interest_list[x].name);
			}
		}

	};
	$scope.update = function (id) {
		var people, x;
		for (x in self.school) {
			if (self.school[x].id == id) {
				people = self.school[x];
			}
		}
		$scope.edit = false;
		//if(self.school[key]!=null)
		//delete self.school[key];
		//console.log(self.school[0]);
		people.name = $scope.edit_name;
		people.age = $scope.edit_age;
		people.weight = $scope.edit_weight;
		people.sex = $scope.edit_sex;

		var tmp_attr = "";

		if (self.interest_list.length == self.interest_list.filter(isChecked).length) {
			tmp_attr = ",all";
		} else {
			var tmp_arr = self.interest_list.filter(isChecked);
			for (x in tmp_arr) {
				tmp_attr += "," + tmp_arr[x].name;
			}
		}
		people.interest = tmp_attr.substr(1);

		$scope.check_all = false;

		if (!in_array(self.modifyId, id)) {
			self.modifyId.push(id);
		}
		//console.log(self.school[key].interest);
		//console.log(self.modifyId);
	};
	$scope.in_array = function (arr, val) {
		in_array(arr, val);
	};
	$scope.toggleAll = function (check_all) {
		for (var x in self.interest_list) {
			self.interest_list[x].checked = check_all;
		}
	}
	
	var self = this;
	self.school = [{
		"id": 1,
		"name": "john",
		"age": 18,
		"weight": 50,
		"interest": "ball,swim,jump",
		"sex": 1
	},
    {
    	"id": 3,
    	"name": "jack",
    	"age": 19,
    	"weight": 53,
    	"interest": "ball,fly,run",
    	"sex": 1
    },
    {
    	"id": 5,
    	"name": "mary",
    	"age": 20,
    	"weight": 43,
    	"interest": "run,jump,coding",
    	"sex": 2
    }];
	self.modifyId = Array();
	self.type = [
      { "id": 1, "name": "男" },
      { "id": 2, "name": "女" }
	];
	self.interest_list =[ 
      { "name":"run"	,"checked": false },
      { "name":"jump"	,"checked": false },
      { "name":"coding"	,"checked": false },
      { "name":"fly"	,"checked": false },
	  { "name":"ball"	,"checked": false },
	  { "name": "swim", "checked": false }];

	// upload pic start
	/*$scope.$watch('file', function (file) {
		$scope.upload($scope.file);
	});

	 optional: set default directive values */
	//Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );

	/*$scope.upload = function (file) {
		Upload.upload({
			url: 'upload/url',
			fields: { 'username': $scope.username },
			file: file
		}).progress(function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			//console.log('progress: ' + progressPercentage + '% ' );
			//console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		}).success(function (data, status, headers, config) {
			console.log("success");
			console.log(data);
			//console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
		}).error(function (data, status, headers, config) {
			//console.log('error status: ' + status);
		})
	};*/
	// upload pic end

	//ajax test
	$http({
		url: "/test/json",
		method: "POST"
	}).success(function (data, status, headers, config) {
		$scope.json = data;
	}).error(function (data, status, headers, config) {
		$scope.status = status;
	});
	//////////////////////////
	$scope.getFile = function () {
		$scope.progress = 0;
		fileReader.readAsDataUrl($scope.file, $scope)
			.then(function (result) {
				$scope.imageSrc = result;
        });
	};

	$scope.$on("fileProgress", function (e, progress) {
		$scope.progress = progress.loaded / progress.total;
	});
});

app.directive("ngFileSelect",function(){

	return {
		link: function($scope,el){
      
			el.bind("change", function(e){
      
				$scope.file = (e.srcElement || e.target).files[0];
				$scope.getFile();
			})
      
		}
    
	}

})
////////////////////////////////////////////
function in_array(arr, val) {
	for (var x in arr) {
		if (arr[x] == val) {
			return true;
		}
	}
	return false;
}

function isChecked(value) {
	return value.checked;
}

