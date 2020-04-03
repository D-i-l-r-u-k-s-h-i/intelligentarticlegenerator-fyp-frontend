import loginService from './loginService'
import maskedLMService from './maskedLMService'
import articleService from './articleService'

export default [
    ...loginService,
    ...maskedLMService,
    ...articleService
]