import classes from "./CounselDone.module.css";
import Card from "../../components/ui/Card";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CounselDone = () => {
  return (
    <div>
      <div className={classes.pink}>
        <div className={classes.title}>상담완료!</div>
        <div>좋은 상담 시간이었나요?</div>
        <div>상담에 대한 리뷰를 남겨주세요.</div>
      </div>
      <Card className={classes.back}>
        <img src="./sampleCounselorSquare.png"></img>
        <div>
          <div>
            <span>조성규 상담사</span>
            <img src="./genderM.png"></img>
          </div>
          <div>일시</div>
          <div>2022/10/05 11:00 ~ 12:00</div>
        </div>
      </Card>
      <div className={classes.title2}>리뷰 작성</div>
      <div>
        <span>61231님(익명)</span>
        <span>2022.09.05</span>
      </div>
      <div>
        <img src="./Star.png"></img>
        <img src="./Star.png"></img>
        <img src="./Star.png"></img>
        <img src="./Star.png"></img>
        <img src="./Star.png"></img>
      </div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "리뷰를 입력해주세요",
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <div>
        <button className={classes.cancel}>취소</button>
        <button className={classes.done}>작성 완료</button>
      </div>
    </div>
  );
};

export default CounselDone;
