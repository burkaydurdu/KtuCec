//layouts
import '/imports/ui/layouts/'
import '/imports/ui/components/navBar/'
//pages
import '/imports/ui/pages/login/'
import '/imports/ui/pages/register/'

import '/imports/ui/pages/dashboard/'
import '/imports/ui/pages/dashboard/user/'
import '/imports/ui/pages/dashboard/admin/'

import '/imports/ui/pages/activity/'
import '/imports/ui/pages/activity/show/'
import '/imports/ui/pages/activity/edit/'
import '/imports/ui/pages/activity/single/'
import '/imports/ui/pages/activity/create/'

import '/imports/ui/pages/users/'
import '/imports/ui/pages/users/profile/'
import '/imports/ui/pages/users/settings/'
import '/imports/ui/pages/users/settings/profile/'
import '/imports/ui/pages/users/settings/account/'
import '/imports/ui/pages/users/forgot.password/'

import '/imports/ui/pages/aboutus/'
import '/imports/ui/pages/notFound/'
import '/imports/ui/pages/managers/'


//lib
import '/imports/ui/lib/countdown/'

//Routers
import './routers/routes.js'
import './routers/outside.js'
import './routers/user.js'
import './routers/admin.js'
import './routers/mutual.js'
//Global
import './utils.js'


reCAPTCHA.config({
    publickey: '6LdkKTwUAAAAAGD5BXq2p3MJvYM5h4jYO1ehsBUq',
    hl: 'tr' // optional display language
});