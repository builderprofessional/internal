<?php

namespace Internal\MarketingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('InternalMarketingBundle:Default:index.html.twig');
    }
}
