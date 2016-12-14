'use strict';

/**
 * @ngdoc function
 * @name Health.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('ApplicationCtrl', function ($scope,$cookies,Data, FileUploader) {

    if($cookies.getObject('application')){
      $scope.application = $cookies.getObject('application');
    }
    else{
      $scope.application = {};
    }

    $scope.$watch('application', function(newVal, oldVal){
      $cookies.putObject('application',$scope.application,{"expires":moment().add(60,'seconds').format(),secure:false});
    }, true);
    $scope.FormPages = [{id:0,title:'Info',url:'views/Modals/FormParts/Info.html',completed:false}
                       ,{id:1,title:'Resume',url:'views/Modals/FormParts/FileUpload.html',completed:false}
                     ,{id:2,title:'Survey',url:'views/Modals/FormParts/FileUpload.html',completed:false}
                   ,{id:3,title:'Submit',url:'views/Modals/FormParts/Submit.html',completed:false}];
    $scope.CurrentPage = $scope.FormPages[0];
    $scope.NextPage = function(){
      $scope.CurrentPage.completed = true;
      $scope.CurrentPage = $scope.FormPages[$scope.CurrentPage.id + 1];
    };
    $scope.PreviousPage = function(){
      $scope.CurrentPage = $scope.FormPages[$scope.CurrentPage.id - 1];
    };
    $scope.recruitUploader = new FileUploader({
        url: 'https://api-content.dropbox.com/2/files/upload',
        headers: {
          Authorization: 'Bearer Q97s2PcThkMAAAAAAAB12r6Z6FAIKdLFxUy8uTSFqAv2VnRRG6QxtK80OukeGzBh',
          "Dropbox-API-Arg": {"mode": "add","autorename": true,"mute": false},
          "Content-Type": "application/octet-stream"

        },
        method: 'POST',
        disableMultipart: true
      });

      $scope.recruitUploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    $scope.recruitUploader.onBeforeUploadItem = function(item) {
      var re = /(?:\.([^.]+))?$/;
       var ext = re.exec(item.file.name)[1]; // "txt"
       item.newName = item.file.name; //+ '.' + ext;
       item.ext = ext;
       item.headers['Dropbox-API-Arg'].path ='/temp/'+ item.newName;
        item.headers['Dropbox-API-Arg'] = angular.toJson(item.headers['Dropbox-API-Arg']);
       //item.url = item.url +'?path=/temp/'+ item.newName+'&mode=add&autorename=true&mute=false';
};
    $scope.fileIcon = function(type){
      console.log(type);
      if(['image/png','image/bmp','image/jpg','image/jpeg','image/tiff','image/gif'].indexOf(type)!== -1){
        return 'page_white_picture';
      }
      if(['application/x-rar-compressed', 'application/octet-stream','application/zip'].indexOf(type)!== -1){
        return 'page_white_zip';
      }
      if(['application/vnd.oasis.opendocument.text','application/x-iwork-pages-sffpages','application/msword','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.wordprocessingml.template','application/vnd.ms-word.document.macroEnabled.12','application/vnd.ms-word.template.macroEnabled.12'].indexOf(type)!== -1){
        return 'page_white_word';
      }
      if(['application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.presentationml.template','application/vnd.openxmlformats-officedocument.presentationml.slideshow','application/vnd.ms-powerpoint.addin.macroEnabled.12','application/vnd.ms-powerpoint.presentation.macroEnabled.12','application/vnd.ms-powerpoint.template.macroEnabled.12','application/vnd.ms-powerpoint.slideshow.macroEnabled.12'].indexOf(type)!== -1){
        return 'page_white_powerpoint';
      }
      if(['application/pdf'].indexOf(type)!== -1){
        return 'page_white_acrobat';
      }
      if(['application/vnd.oasis.opendocument.spreadsheet','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.spreadsheetml.template','application/vnd.ms-excel.sheet.macroEnabled.12','application/vnd.ms-excel.template.macroEnabled.12','application/vnd.ms-excel.addin.macroEnabled.12','application/vnd.ms-excel.sheet.binary.macroEnabled.12'].indexOf(type)!== -1){
        return 'page_white_excel';
      }
      else{
        return 'page_white_text';
      }

    };
  });
