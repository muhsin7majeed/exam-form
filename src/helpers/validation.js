import * as _y from "yup";

export const validationSchema = _y.object().shape({
  numberOfSections: _y.string().required("Number of sections is required"),
  sections: _y.array().of(
    _y.object().shape({
      sectionName: _y.string().required("Section name is required"),
      sectionDesc: _y.string(),
      shuffleQuestions: _y.boolean(),

      questions: _y.array().of(
        _y.object().shape({
          // questionType can be 'single', 'multi', 'img', 'paragraph'
          questionType: _y.string().required("Question type is required"),
          totalMarks: _y.number().required("Total marks is required"),
          negativeMarks: _y.number(),
          isOptional: _y.boolean(),

          questionName: _y.string().required("Question Name is required"),
          questionAnswer: _y.string().when("questionType", (questionType) => {
            if (questionType === "single" || questionType === "multi") {
              return _y.array().of(
                _y.object().shape({
                  optionName: _y.string().required("Option is required"),
                })
              );
            }

            return _y.string();
          }),
        })
      ),
    })
  ),
});
