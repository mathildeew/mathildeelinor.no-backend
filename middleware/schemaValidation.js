import * as Yup from "yup";

export const createPostSchema = Yup.object().shape({
  message: Yup.string().min(5, "Meldingen må være over 5 tegn").max(500, "Meldingen kan ikke være over 500 tegn").required("Du må skrive en melding"),
  image: Yup.mixed().notRequired(),
});

export const updatePostSchema = Yup.object().shape({
  message: Yup.string().min(5, "Meldingen må være over 5 tegn").max(500, "Meldingen kan ikke være over 500 tegn").notRequired(),
  image: Yup.mixed().notRequired(),
});
