<?php
/**
 * This controller allows a public user to submit a contact request.
 *
 * @copyright 2016 Third Engine Software
 */
namespace Internal\MarketingBundle\Controller;


use Internal\MarketingBundle\Notification\ContactUs;

use Engine\EngineBundle\Validation\Validator;

use ThirdEngine\Factory\Factory;
use ThirdEngine\PropelSOABundle\Controller\ServiceController;
use ThirdEngine\PropelSOABundle\Http\PropelSOASuccessResponse;

use Symfony\Component\HttpFoundation\Request;


/**
 * @route /contactUs
 */
class ContactUsController extends ServiceController
{
  /**
   * This action will send an email to the correct Builder Professional team.
   *
   * @param Request $request
   */
  public function postAction(Request $request)
  {
    $rawData = $request->getContent();
    $post = json_decode($rawData, true);

    $contactUsValidator = Factory::createNewObject(Validator::class);
    if (!$contactUsValidator->validateWithRulesKey($post, 'contactus'))
    {
      return $contactUsValidator->getHttpErrorResponse();
    }

    $contactUsData = [
      $post['Name'],
      $post['Email'],
      $post['Phone'],
      $post['Time'],
      $post['Question'],
    ];

    $contactUsNotification = Factory::createNewObject(ContactUs::class, $contactUsData);
    $contactUsNotification->send();

    return new PropelSOASuccessResponse(['sent' => true]);
  }
}
