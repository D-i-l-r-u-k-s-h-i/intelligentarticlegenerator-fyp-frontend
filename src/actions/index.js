import * as Login from './login'
import * as GetLMResult from './getMaskedLM'
import * as SaveArticle from './saveArticle'
import * as DownloadArticle from './downloadArticle'
import * as GetArticles from './getArticles'
import * as EditArticle from './editArticle'
import * as GetHTMLText from './getHTML'
import * as GetGeneratedArticles from './getGeneratedArticles'
import * as SignUp from './signup'
import * as EditName from './editName'
import * as DeleteArticle from './deleteArticle'
import * as CancelRequest from './cancelRequest'
import * as SearchArticle from './searchArticle'

export{
    Login as loginTypes
}

export{
    CancelRequest as CancelRequestTypes
}

export{
    GetLMResult as lmResultTypes
}

export{
    SaveArticle as saveArticleTypes
}

export{
    SearchArticle as searchArticleTypes
}

export{
    DownloadArticle as downloadArticleTypes
}

export{
    GetArticles as getArticleTypes
}

export{
    EditArticle as editArticleTypes
}

export{
    DeleteArticle as deleteArticleTypes
}

export{
    EditName as editNameTypes
}

export{
    GetHTMLText as getHtmlTypes
}

export{
    GetGeneratedArticles as getGeneratedArticleTypes
}

export{
    SignUp as signUpTypes
}

export const loginActions=Login.default;

export const cancelRequestActions=CancelRequest.default;

export const lmResultActions=GetLMResult.default;

export const saveArticleActions=SaveArticle.default;

export const searchArticleActions=SearchArticle.default;

export const downloadArticleActions=DownloadArticle.default;

export const getArticleActions=GetArticles.default;

export const editArticleActions=EditArticle.default;

export const deleteArticleActions=DeleteArticle.default;

export const editNameActions=EditName.default;

export const getHtmlActions= GetHTMLText.default;

export const getGeneratedArticleActions=GetGeneratedArticles.default;

export const signUpActions=SignUp.default;