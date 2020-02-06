var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
var time = new Date();
time = time.toLocaleTimeString();

Vue.filter('striphtml', function (value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
});
Vue.use(CKEditor);

var app = new Vue({
    el: '#myapp',
    data: {
        wpisy: "",
        szukaneWpisy: "",
        ostatnieWpisy: "",
        wpisid: 0,
        wpis: "",
        kategoria: "",
        tytul: "",
        dataWpisu: today + " " + time,
        categories: "",
        show: false,
        showText: false,
        showTitle: false,
        showTitleCategory: false,
        showRecord: false,
        showDetails: false,
        searchInput: '',
        selected: '',
        selectedAdd: '',
        wpisNowy: '',
        activetab: 1,
        activeNum: 1,
        editor: ClassicEditor,
        editorData: '<p>Wpisz swoją notatkę</p>',
        editorConfig: {},
        showSuccess: false,
        showAlert: false,
        hideTitle: false,
        showContent: 'Zobacz',
        hideContent: 'Zamknij'
    },
    methods: {
        getCategory: function() {
            var element = document.getElementsByClassName('categotyTitileSearch')[0];
            element.textContent = this.selected;
        },
        showResultsCategories: function() {
            var selectedOption = this.selected;
            this.hideTitle = true;
            axios.post('ajaxfile.php', {
                request: 7,
                selected: selectedOption,
            })
            .then(function (response) {
                app.szukaneWpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
            this.resetToDefault();
            this.show = true;
            this.showTitleCategory = true;
            this.showTitle = '';
            this.selected = '';
        },
        allCategories: function() {
            axios.post('ajaxfile.php', {
                request: 6
            })
            .then(function (response) {
                app.categories = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        showResults: function() {
            this.searchInput = $('#autocomplete').val();
            this.hideTitle = true;
            axios.post('ajaxfile.php', {
                request: 5,
                searchInput: this.searchInput,
            })
            .then(function (response) {
                app.szukaneWpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
            this.show = true;
            this.showTitle = true;
            this.showTitleCategory = '';
        },
        allRecords: function(){
            axios.post('ajaxfile.php', {
                request: 1
            })
            .then(function (response) {
                app.wpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        latestFiveRecords: function(){
            axios.post('ajaxfile.php', {
                request: 8
            })
            .then(function (response) {
                app.ostatnieWpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        latestTenRecords: function(){
            axios.post('ajaxfile.php', {
                request: 81
            })
            .then(function (response) {
                app.ostatnieWpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        latestFifteenRecords: function(){
            axios.post('ajaxfile.php', {
                request: 82
            })
            .then(function (response) {
                app.ostatnieWpisy = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addRecord: function(){
            if(this.wpisNowy != '' && this.kategoria != '' && this.tytul != '' && this.dataWpisu != ''){
                axios.post('ajaxfile.php', {
                    request: 2,
                    wpisNowy: this.wpisNowy,
                    kategoria: this.kategoria,
                    tytul: this.tytul,
                    dataWpisu: this.dataWpisu
                })
                .then(function (response) {
                    // Fetch records
                    app.allRecords();

                    // Empty values
                    app.wpisNowy = '';
                    app.kategoria = '';
                    app.tytul = '';
                    app.dataWpisu = today + " " + time;
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.showSuccess = true;
            } 
            else if (this.wpisNowy != '' && this.selectedAdd != '' && this.tytul != '' && this.dataWpisu != '') {
                axios.post('ajaxfile.php', {
                    request: 22,
                    wpisNowy: this.wpisNowy,
                    selectedAdd: this.selectedAdd,
                    tytul: this.tytul,
                    dataWpisu: this.dataWpisu
                })
                .then(function (response) {
                    app.allRecords();
                    app.clearFields();
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.showSuccess = true;
            } else {
                this.showAlert = true;
            }
            this.hide();
        },
        hide: function() {
            setTimeout(() => {
                this.showSuccess = false;
                this.showAlert = false;
            }, 4000);
        },
        clearFields: function() {
            this.wpisNowy = '';
            this.selectedAdd = '';
            this.kategoria = '';
            this.tytul = '';
            this.dataWpisu = today + " " + time;
        },
        updateRecord: function(index,id,wpis){

            // Read value from Textbox
            var wpis = this.szukaneWpisy[index].wpis;

            // if(kategoria !=''){
                axios.post('ajaxfile.php', {
                    request: 3,
                    id: id,
                    wpis: wpis
                })
                .then(function (response) {
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // }
        },
        deleteRecord: function(index,id){
            
            axios.post('ajaxfile.php', {
                request: 4,
                id: id
            })
            .then(function (response) {
                // Remove index from wpisy
                app.szukaneWpisy.splice(index, 1);
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
                
        },
        cleanRecords: function() {
            this.szukaneWpisy = '';
            this.searchInput = '';
            this.showTitleCategory = '';
            this.showTitle = '';
            this.selected = '';
            this.hideTitle = false;
        },
        showItemContent: function(id) {
            let elementId = document.getElementById(id);
            let button = elementId.querySelector('.btn-success');
            let elementContent = elementId.querySelector('.latesNoteContent');
            if (button.value == 'Zobacz') {
                this.resetToDefault();
                button.value = this.hideContent;
                elementContent.style.display = "block";
            } else {
                button.value = this.showContent;
                elementContent.style.display = "none";
            }
        },
        resetToDefault: function() {
            let allButtons = document.querySelectorAll('.btn-success');
            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].value = this.showContent;
            }
            let allItemsContent = document.querySelectorAll('.latesNoteContent');
            for (let j = 0; j < allItemsContent.length; j++) {
                allItemsContent[j].style.display = "none";
            }
        }
    },
    created: function(){
        this.latestFiveRecords();
        this.allCategories();
        $('.ui-menu-item').on('focus', function() {
            this.showResults();
        })
    },
    computed: {
        charactersLeft() {
            var char = this.wpisNowy.length,
                limit = 65353;
    
            return (limit - char) + " / " + limit + " pozostało znaków";
        }
    },
}).$mount('#myapp');