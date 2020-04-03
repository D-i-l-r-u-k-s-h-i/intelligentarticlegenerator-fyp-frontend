import * as Login from './login'
import * as GetLMResult from './getMaskedLM'
import * as SaveArticle from './saveArticle'
import * as DownloadArticle from './downloadArticle'
import * as GetArticles from './getArticles'

export{
    Login as loginTypes
}
export{
    GetLMResult as lmResultTypes
}
export{
    SaveArticle as saveArticleTypes
}

export{
    DownloadArticle as downloadArticleTypes
}

export{
    GetArticles as getArticleTypes
}


export const loginActions=Login.default;

export const lmResultActions=GetLMResult.default;

export const saveArticleActions=SaveArticle.default;

export const downloadArticleActions=DownloadArticle.default;

export const getArticleActions=GetArticles.default;
