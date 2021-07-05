 <template>
   <div id="app">
     <!-- 绑定props中的description -->
     <editor
       v-model="this.description"
       api-key="no-api-key"
       @input="edit"
       
       :init="{
        
         height: 500,
         language_url: '../../../static/tinymce/langs/zh_CN.js',
         language: 'zh_CN',
         branding: false, // 去水印
         menubar: false,
         images_upload_credentials: true,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic underline backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen| removeformat | help'
       }"
     />
     
   </div>
 </template>

 <script>
 import Editor from '@tinymce/tinymce-vue'

 export default {
   name: 'TinymceEditor',
   components: {
     'editor': Editor
   },
   data(){
       return{
           
          
       }
   },
   props:{
     description:String
   },
   methods:{
     edit(e){
       
       this.$emit("edit",e)
     }
   }
 }
 </script>
