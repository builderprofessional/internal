<?php
/**
 * This controller allows a public user to buy the Windows Desktop Estimator product.
 *
 * @copyright 2016 Third Engine Software
 */
namespace Internal\MarketingBundle\Controller;


use Engine\BillingBundle\Model\AnonymousPurchase;
use Engine\BillingBundle\Controller\AnonymousPurchaseController;

use Symfony\Component\HttpFoundation\Request;


/**
 * @route /purchase
 */
class EstimatorPurchaseController extends AnonymousPurchaseController
{
  /**
   * This action will purchase the estimator or additional licenses with encrypted credit card information.
   *
   * Required Fields
   * Name, Email, CreditCardNumberEncrypted, ExpirationMonthEncrypted, ExpirationYearEncrypted, CVVEncrypted, State, ZipCode, ProductCodes[]
   *
   * Optional Fields
   * CompanyName, Address
   *
   * @route /public/internal/purchase
   *
   * @Route("/purchase")
   * @Method({"POST"})
   *
   * @param Request $request
   */
  public function postAction(Request $request)
  {
    return parent::postAction($request);
  }

  /**
   * This method will determine what instructions should be sent to the user based on what products they bought.
   *
   * @param AnonymousPurchase $purchase
   * @return array
   */
  protected function getInstructionTemplates(AnonymousPurchase $purchase)
  {
    $isNewEstimatorPurchase = false;
    $newEstimatorProductCodes = ['SILVER', 'GOLD', 'PLATINUM'];

    foreach ($purchase->getAnonymousPurchaseProducts() as $productLink)
    {
      if (in_array($productLink->getProduct()->getCode(), $newEstimatorProductCodes))
      {
        $isNewEstimatorPurchase = true;
        break;
      }
    }

    $templateName = $isNewEstimatorPurchase
      ? 'estimatorPurchaseInstructions'
      : 'estimatorLicenseInstructions';

    return [
      'instructionsText' => sprintf('InternalMarketingBundle:EmailNotification:%s.text.twig', $templateName),
      'instructionsHtml' => sprintf('InternalMarketingBundle:EmailNotification:%s.html.twig', $templateName),
    ];
  }
}
