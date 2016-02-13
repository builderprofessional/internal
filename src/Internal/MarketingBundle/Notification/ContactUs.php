<?php
/**
 * This notification will be sent to internal Builder Professional teams.
 *
 * @copyright 2016 Third Engine Software
 */
namespace Internal\MarketingBundle\Notification;


use Engine\EngineBundle\Base\Notification;
use Engine\EngineBundle\Base\EmailNotification;


class ContactUs extends Notification
{
  use EmailNotification;


  /**
   * @var string
   */
  protected $textTemplatePath = 'InternalMarketingBundle:EmailNotification:contactUs.text.twig';

  /**
   * @var string
   */
  protected $htmlTemplatePath = 'InternalMarketingBundle:EmailNotification:contactUs.html.twig';


  /**
   * @var string
   */
  protected $name;

  /**
   * @var string
   */
  protected $email;

  /**
   * @var string
   */
  protected $phone;

  /**
   * @var string
   */
  protected $timeAvailable;

  /**
   * @var string
   */
  protected $question;


  /**
   * @param string $name
   * @param string $email
   * @param string $phone
   * @param string $timeAvailable
   * @param string $question
   */
  public function __construct($name, $email, $phone, $timeAvailable, $question)
  {
    $this->name = $name;
    $this->email = $email;
    $this->phone = $phone;
    $this->timeAvailable = $timeAvailable;
    $this->question = $question;

    $this->setupStandardTokenDefinitions();
    $this->addAdditionalTokens();
  }

  /**
   * This method will add additional tokens that should be supported for this notification.
   */
  protected function addAdditionalTokens()
  {
    $this->tokenDefinitions['NAME'] = function()
    {
      return $this->name;
    };

    $this->tokenDefinitions['EMAIL'] = function()
    {
      return $this->email;
    };

    $this->tokenDefinitions['PHONE'] = function()
    {
      return $this->phone;
    };

    $this->tokenDefinitions['TIME_AVAILABLE'] = function()
    {
      return $this->timeAvailable;
    };

    $this->tokenDefinitions['QUESTION'] = function()
    {
      return $this->question;
    };
  }

  /**
   * @return string
   */
  protected function subject()
  {
    return 'Contact Request';
  }

  /**
   * @return array
   */
  public function getToEmail()
  {
//    return ['sales@builderprofessional.com', 'support@builderprofessional.com'];
    return ['tony.vance@builderprofessional.com', 'robert.flach@builderprofessional.com'];
  }
}