
class FileController{
  uploads(req,res){
    try {
      console.log(req.body);
      console.log(req.file);
      res.json({ message: "Successfully uploaded files" });
    } catch (error) {
      
    }
  }
}
export default new FileController()