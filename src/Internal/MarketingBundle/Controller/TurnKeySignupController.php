<?php
/**
 * This controller exposes the signup capabilities of engine to the turn-key website signup process.
 *
 * @copyright 2016 Third Engine Software
 */
namespace Internal\MarketingBundle\Controller;


use Engine\BillingBundle\Controller\SignupController;
use Engine\BillingBundle\Model\Signup;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * @route /turnKeySignup
 */
class TurnKeySignupController extends SignupController
{
  /**
   * This action will start the signup process.
   *
   * @param Request $request
   */
  public function postAction(Request $request)
  {
    return parent::postActionHandler($request, false);
  }

  /**
   * This action will start the signup process, but will behave like a normal API call, it will not handle
   * a standard form post.
   *
   * @param Request $request
   */
  public function signupAction(Request $request)
  {
    return parent::signupActionHandler($request, false);
  }

  /**
   * This action will complete the signup process and create a billing client.
   *
   * @param Request $request
   */
  public function completeAction(Request $request)
  {
    return parent::completeActionHandler($request);
  }

  /**
   * This action will find a signup record based on the associated token.
   *
   * @param Request $request
   */
  public function findByTokenAction($token, Request $request)
  {
    return parent::findByTokenActionHandler($token, $request);
  }

  /**
   * This method will send the notification out to allow someone to convert from a signup to a
   * billing client for the training system.
   *
   * @param Signup $signup
   */
  protected function notify(Signup $signup)
  {
    // Right now, the Turn-Key program does not have a signup confirmation notification.
  }
}