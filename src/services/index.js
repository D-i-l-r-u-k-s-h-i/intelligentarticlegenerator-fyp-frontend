import loginService from './loginService'
import maskedLMService from './maskedLMService'
import articleService from './articleService'
import signupService from './signupService'

export default [
    ...loginService,
    ...maskedLMService,
    ...articleService,
    ...signupService,
]