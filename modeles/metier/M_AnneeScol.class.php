<?php

/**
 * Description of M_AnneeScol
 *
 * @author btssio
 */
class M_AnneeScol {

    private $AnneeScol; // type : String

    function __construct($AnneeScol) {
        $this->AnneeScol = $AnneeScol;
    }
    public function getAnneeScol() {
        return $this->AnneeScol;
    }

    public function setAnneeScol($AnneeScol) {
        $this->AnneeScol = $AnneeScol;
    }


}