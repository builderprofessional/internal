(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewSoftwareVideo', title: "Software Videos", url: '/softwarevideo', role: 'ROLE_ALL'});
		}]);
		internalApp.directive("engViewSoftwareVideo",["$modal",SoftwareVideo]);
		function SoftwareVideo($modal)
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/softwareVideo/partial.html",
				controller: ['$scope',
					function($scope)
					{
            $scope.showLightbox = function (template,title)
            {
              $scope.modal = $modal(
                  {
                    contentTemplate: template,
                    show: true,
                    backdrop: true,
                    title:title,
                    animation: 'lightbox-fade',
                    backdropAnimation: 'lightbox-fade-bg',
                    id:'lightboxModal',
                    scope: $scope
                  });
            };
						$scope.signup = function(){
							document.location.href=env_url+"/purchase";
						};
						$scope.Parts = [
              {Chapter:       1 ,Part:    0 ,Title:'Where Do I Begin?',Code:''},
              {Chapter:       1 ,Part:    1 ,Title:'The Desktop',Code:'01Desktop'},
              {Chapter:       1 ,Part:    2 ,Title:'Fill In Company Information',Code:'02CompanyInfo'},
              {Chapter:       1 ,Part:    3 ,Title:'Fill In Standard Tax Rates',Code:'03TaxRates'},
              {Chapter:       1 ,Part:    4 ,Title:'Fill In Allowance Contract',Code:'04AllowContract'},
              {Chapter:       1 ,Part:    5 ,Title:'Set QuickBooks Options',Code:'05QBsOptions'},
              {Chapter:       1 ,Part:    6 ,Title:'What is a "Primary Master" & How Does it Differ from an "Estimate"',Code:'06WhatIsPM'},
              {Chapter:       1 ,Part:    7 ,Title:'How Do I Decide Which "Primary Master" to Use?',Code:'07WhichPMToUse'},
              {Chapter:       1 ,Part:    8 ,Title:'How to Open, Save & Close a "Primary Master"',Code:'08OpenSaveClosePM'},
              {Chapter:       1 ,Part:    9 ,Title:'How to Open, Save & Close an "Estimate"',Code:'09OpenSaveCloseEst'},
              {Chapter:       1 ,Part:   10 ,Title:'How to Create a New "Primary Master"',Code:'10CreatePM'},
              {Chapter:       1 ,Part:   11 ,Title:'How to Create a New "Estimate"',Code:'11CreateEst'},
              {Chapter:       1 ,Part:   12 ,Title:'How to Import a Primary Master or Estimate from Version 8 or 9',Code:'12ImportPMorEst'},
              {Chapter:       2 ,Part:    0 ,Title:'How to Navigate the "Primary Master"',Code:''},
              {Chapter:       2 ,Part:    1 ,Title:'The "Report Group" Drop-Down Box',Code:'01ReportGroupDropDown'},
              {Chapter:       2 ,Part:    2 ,Title:'The "Unit", "Method", & "Type" Drop-Down Boxes',Code:'02UnitMethodType'},
              {Chapter:       2 ,Part:    3 ,Title:'What is a "Report Group"',Code:'03WhatIsReportGroup'},
              {Chapter:       2 ,Part:    4 ,Title:'How to Add or Re-Sort "Report Groups"',Code:'04Add-ResortReportGroup'},
              {Chapter:       2 ,Part:    5 ,Title:'What is a "Main Item" & "Sub-Item"',Code:'05WhatIsMainItem-SubItem'},
              {Chapter:       2 ,Part:    6 ,Title:'How to Add or Re-Sort "Main Items"',Code:'06Add-ResortMainItem'},
              {Chapter:       2 ,Part:    7 ,Title:'How to Add or Re-Sort "Sub-Items"',Code:'07Add-ResortSubItem'},
              {Chapter:       2 ,Part:    8 ,Title:'Handling & Understanding "Main Items" & "Sub-Items"',Code:'08HandlingMainItem-SubItem'},
              {Chapter:       2 ,Part:    9 ,Title:'Handling & Understanding "Phased Items"',Code:'09HandlingPhasedItem'},
              {Chapter:       2 ,Part:   10 ,Title:'How to Delete "Main Items" & "Sub-Items"',Code:'10DeleteMainItem-SubItem'},
              {Chapter:       2 ,Part:   11 ,Title:'How to Add, Edit, or Delete "Notes"',Code:'11AddEditDeleteNotes'},
              {Chapter:       3 ,Part:    0 ,Title:'How to Export a "Primary Master" to QuickBooks',Code:''},
              {Chapter:       3 ,Part:    1 ,Title:'How Do I Export My "Primary Master" to QuickBooks',Code:'01Why-HowExportPMToQB'},
              {Chapter:       4 ,Part:    0 ,Title:'How to Use the New "BSE Estimator Wizard"',Code:''},
              {Chapter:       4 ,Part:    1 ,Title:'New Estimator Wizard',Code:'01BSEEstimatorWizard'},
              {Chapter:       5 ,Part:    0 ,Title:'How to Navigate the "Estimate Worksheet"',Code:''},
              {Chapter:       5 ,Part:    1 ,Title:'Filling in the "Demographic Information" Box',Code:'01FillInDemoInfo'},
              {Chapter:       5 ,Part:    2 ,Title:'Filling in the "Tax Rates" Box',Code:'02FillInTaxRate'},
              {Chapter:       5 ,Part:    3 ,Title:'Filling in the "Footages" Box',Code:'03FillInFootages'},
              {Chapter:       5 ,Part:    4 ,Title:'Filling in the "Profit Rates" Box',Code:'04FillInProfitRate'},
              {Chapter:       5 ,Part:    5 ,Title:'The "Report Group" Drop-Down Box',Code:'05ReportGroupDropDown'},
              {Chapter:       5 ,Part:    6 ,Title:'The "Unit", "Method", & "Type" Drop-Down Boxes',Code:'06UnitMethodType'},
              {Chapter:       5 ,Part:    7 ,Title:'What is a "Report Group"',Code:'07WhatIsReportGroup'},
              {Chapter:       5 ,Part:    8 ,Title:'How to Add or Re-Sort "Report Groups"',Code:'08Add-ResortReportGroup'},
              {Chapter:       5 ,Part:    9 ,Title:'What is a "Main Item" & "Sub-Item"',Code:'09WhatIsMainItem-SubItem'},
              {Chapter:       5 ,Part:   10 ,Title:'How to Add or Re-Sort "Main Items"',Code:'10Add-ResortMainItem'},
              {Chapter:       5 ,Part:   11 ,Title:'How to Add or Re-Sort "Sub-Items"',Code:'11Add-ResortSubItem'},
              {Chapter:       5 ,Part:   12 ,Title:'Handling & Understanding "Main Items" & "Sub-Items"',Code:'12HandlingMainItem-SubItem'},
              {Chapter:       5 ,Part:   13 ,Title:'Handling & Understanding "Phased Items"',Code:'13HandlingPhasedItem'},
              {Chapter:       5 ,Part:   14 ,Title:'How to Delete "Main Items" & "Sub-Items"',Code:'14DeleteMainItem-SubItem'},
              {Chapter:       5 ,Part:   15 ,Title:'How to Add, Edit, or Delete "Notes"',Code:'15AddEditDeleteNotes'},
              {Chapter:       6 ,Part:    0 ,Title:'How to Export an "Estimate" to QuickBooks',Code:''},
              {Chapter:       6 ,Part:    1 ,Title:'How Do I Export My "Estimate" to QuickBooks',Code:'01HowToExportEstimate'},
              {Chapter:       7 ,Part:    0 ,Title:'How to Build a "Schedule" for an Estimate',Code:''},
              {Chapter:       7 ,Part:    1 ,Title:'How to Build a "Schedule" for an Estimate',Code:'01Schedule'},
              {Chapter:       8 ,Part:    0 ,Title:'How does the "Report Wizard" Work?',Code:''},
              {Chapter:       8 ,Part:    1 ,Title:'How does the "Report Wizard" Work?',Code:'01ReportWizard'},
              {Chapter:       9 ,Part:    0 ,Title:'Why Does BSE Offer a Company File for QuickBooks?',Code:''},
              {Chapter:       9 ,Part:    1 ,Title:'Why Does BSE Offer a Company File for QuickBooks?',Code:'01QBs'}
              ];
					}
				]
			};
		}
	   
})();
