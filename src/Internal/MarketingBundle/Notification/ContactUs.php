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
  public $name;

  /**
   * @var string
   */
  public $email;

  /**
   * @var string
   */
  public $phone;

  /**
   * @var string
   */
  public $timeAvailable;

  /**
   * @var string
   */
  public $question;


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
    $this->addTokenFromProperty('NAME', $this, 'name');
    $this->addTokenFromProperty('EMAIL', $this, 'email');
    $this->addTokenFromProperty('PHONE', $this, 'phone');
    $this->addTokenFromProperty('TIME_AVAILABLE', $this, 'timeAvailable');
    $this->addTokenFromProperty('QUESTION', $this, 'question');
  }

  /**
   * @return string
   */
  protected function subject()
  {
    return 'Contact Request';
  }

  /**
   * @return string
   */
  public function getToEmail()
  {
    return 'sales@builderprofessional.com';
  }
}